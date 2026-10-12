/**
 * GolfDTV 韓国Messengerリード → 既存スプレッドシートの `KR_Messenger_Leads` タブ
 *
 * 既存LP問い合わせ用の Apps Script / Webhook とは別プロジェクト・別デプロイ（独立したWebアプリ）。
 * 既存タブ（問い合わせ一覧 / 代理店一覧）には一切触れない。
 *
 * スクリプトプロパティ（プロジェクトの設定 → スクリプト プロパティ）:
 *   SPREADSHEET_ID  対象スプレッドシートのID
 *   RELAY_SECRET    中継サーバー（Next.js）と共有する長いランダム文字列
 *   AD_MAP          広告ID → 'A' | 'C' の対応表（JSON。例 {"123":"A","456":"C"}）。未登録は「不明」
 *
 * 入力（doPost の JSON）:
 *   { secret, events: [ { eventKey, psid, adId, type, timestampMs, answers:[{question, answer}], displayName? } ] }
 *   type = 'LEAD_COMPLETE' | 'LEAD_INCOMPLETE'
 *   eventKey は中継側が Meta のペイロードから作る（受信時刻は使わない）。
 */

var SHEET_NAME = 'KR_Messenger_Leads';
var HEADER = [
  '受付日時（タイ時間）', 'MessengerユーザーID', '表示名', '居住国', '関心事項', '申請希望時期',
  '流入広告', '対応優先度', '対応ステータス', '最終対応日時', '備考', 'イベントキー（重複防止）'
];
var KEY_COL = 12; // L列
var MAX_EVENTS_PER_REQUEST = 50;
var LOCK_WAIT_MS = 8000; // Meta のWebhook応答期限（約5秒）に合わせ、長く待たない。超えたら失敗を返して再送に任せる

// ── 韓国語 → 日本語 ─────────────────────────────────────────────
var RESIDENCE = { '태국': 'タイ', '한국': '韓国', '기타국가': 'その他の国' };
var INTEREST = { '신청조건': '申請条件', '비용': '料金', '신청절차': '申請手続き' };
var TIMING = { '1개월이내': '1か月以内', '1-3개월이내': '1〜3か月以内', '아직미정입니다': '未定', '미정': '未定' };

function normalizeAnswer_(raw) {
  return String(raw)
    .normalize('NFKC')
    .replace(/[\s.。!！]/g, '')
    .replace(/[~〜∼～–—ー]/g, '-');
}

function classifyAnswer_(raw) {
  var key = normalizeAnswer_(raw);
  if (Object.prototype.hasOwnProperty.call(RESIDENCE, key)) return { field: 'residence', ja: RESIDENCE[key] };
  if (Object.prototype.hasOwnProperty.call(INTEREST, key)) return { field: 'interest', ja: INTEREST[key] };
  if (Object.prototype.hasOwnProperty.call(TIMING, key)) return { field: 'timing', ja: TIMING[key] };
  return null;
}

// 営業対応の優先順位のための分類。ビザの承認可能性の判定ではない。
function priorityFromTiming_(timingJa) {
  if (timingJa === '1か月以内') return '高';
  if (timingJa === '1〜3か月以内') return '中';
  if (timingJa === '未定') return '低';
  return '要確認';
}

function formatBangkok_(ms) {
  return Utilities.formatDate(new Date(ms), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');
}

/** 1イベント → 12列の行。取得できない項目は推測せず「不明」または空欄。 */
function buildRow_(ev, adMap, nowMs) {
  var picked = {};
  var notes = [];
  var answers = ev.answers || [];
  for (var i = 0; i < answers.length; i++) {
    var c = classifyAnswer_(answers[i].answer);
    if (!c) { notes.push('未対応の回答: ' + answers[i].answer); continue; }
    if (picked[c.field] !== undefined) notes.push('重複回答(' + c.field + '): ' + answers[i].answer);
    else picked[c.field] = c.ja;
  }
  if (ev.type === 'LEAD_INCOMPLETE') notes.push('未完了リード（途中離脱または対象外の回答）');
  if (ev.dataIssues && ev.dataIssues.length > 0) notes.push('データ不備: ' + ev.dataIssues.join(', ') + '（要手動確認）');
  var whenMs = ev.timestampMs;
  if (typeof whenMs !== 'number' || !whenMs) { whenMs = nowMs; notes.push('受付日時は受信時刻で代替'); }
  var ad = (adMap && ev.adId && adMap[ev.adId]) || '不明';
  if (ad === '不明' && ev.adId) notes.push('広告ID: ' + ev.adId);
  return [
    formatBangkok_(whenMs),
    ev.psid ? String(ev.psid) : '不明',
    ev.displayName || '',
    picked.residence || '不明',
    picked.interest || '不明',
    picked.timing || '不明',
    ad,
    priorityFromTiming_(picked.timing),
    '未対応',
    '',
    notes.join(' / '),
    String(ev.eventKey)
  ];
}

// リードを失わないため、拒否する条件は「重複判定ができない」場合だけに限る。
// 送信者ID・時刻・広告ID・回答などが欠けていても、不備として備考に残して保存する（要手動確認）。
function validateEvent_(ev) {
  if (!ev || typeof ev !== 'object') return 'invalid event';
  if (!ev.eventKey || typeof ev.eventKey !== 'string' || ev.eventKey.length > 300) return 'eventKey missing';
  if (ev.answers && !Array.isArray(ev.answers)) ev.answers = [];
  return null;
}

/** 初回のみ手動実行: タブとヘッダー・入力規則を作る（既存タブは変更しない）。 */
function setupSheet() {
  var ss = SpreadsheetApp.openById(getProp_('SPREADSHEET_ID'));
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADER);
  sh.getRange('A:A').setNumberFormat('@'); // 受付日時は文字列のまま保存（スプレッドシートのタイムゾーンで解釈させない）
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['未対応', '対応中', '連絡済み', '完了', '対象外'], true).build();
  sh.getRange('I2:I').setDataValidation(statusRule);
  sh.setFrozenRows(1);
  return sh;
}

function getProp_(name) {
  var v = PropertiesService.getScriptProperties().getProperty(name);
  if (!v) throw new Error('Script property missing: ' + name);
  return v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 200000) return json_({ ok: false, error: 'bad request' });
    var body = JSON.parse(raw);

    // 認証: 共有シークレット（Apps Script はリクエストヘッダーを読めないため本文に含める）。未設定なら全拒否。
    var expected = PropertiesService.getScriptProperties().getProperty('RELAY_SECRET');
    if (!expected || typeof body.secret !== 'string' || body.secret.length !== expected.length || !safeEqual_(body.secret, expected)) {
      return json_({ ok: false, error: 'forbidden' });
    }
    var events = body.events;
    if (!Array.isArray(events) || events.length === 0 || events.length > MAX_EVENTS_PER_REQUEST) {
      return json_({ ok: false, error: 'bad events' });
    }

    var adMap = {};
    var adMapRaw = PropertiesService.getScriptProperties().getProperty('AD_MAP');
    if (adMapRaw) { try { adMap = JSON.parse(adMapRaw); } catch (err) { adMap = {}; } }

    // 同時受信・Metaの再送対策: スクリプト全体で排他し、ロック内で重複確認→追記までを一括で行う。
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(LOCK_WAIT_MS)) return json_({ ok: false, error: 'busy' }); // 中継側が5xxを返し、Metaが再送する
    try {
      var ss = SpreadsheetApp.openById(getProp_('SPREADSHEET_ID'));
      var sh = ss.getSheetByName(SHEET_NAME) || setupSheet();
      var last = sh.getLastRow();
      var existing = {};
      if (last >= 2) {
        var keys = sh.getRange(2, KEY_COL, last - 1, 1).getValues();
        for (var i = 0; i < keys.length; i++) if (keys[i][0]) existing[String(keys[i][0])] = true;
      }
      var results = [];
      for (var j = 0; j < events.length; j++) {
        var ev = events[j];
        var bad = validateEvent_(ev);
        if (bad) { results.push({ key: ev && ev.eventKey || null, status: 'rejected', reason: bad }); continue; }
        if (existing[ev.eventKey]) { results.push({ key: ev.eventKey, status: 'duplicate' }); continue; }
        var row = buildRow_(ev, adMap, Date.now());
        var r = sh.getLastRow() + 1;
        sh.getRange(r, 1, 1, HEADER.length).setValues([row]);
        existing[ev.eventKey] = true;
        results.push({ key: ev.eventKey, status: 'appended' });
      }
      SpreadsheetApp.flush();
      return json_({ ok: true, results: results });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    // 個人情報（回答・ユーザーID）をログに出さない。エラーメッセージには入力の一部が含まれ得るため、種別のみ記録する。
    console.error('doPost error: ' + (err && err.name));
    return json_({ ok: false, error: 'internal' });
  }
}

function safeEqual_(a, b) {
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
