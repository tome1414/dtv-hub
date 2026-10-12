// Code.gs を Node の vm で実行するためのモック環境（実スプレッドシート・ネットワークには接続しない）。
import { readFileSync } from 'fs'
import vm from 'vm'
import path from 'path'

export function makeAppsScriptEnv(props: Record<string, string>) {
  const sheets: Record<string, any[][]> = { '問い合わせ一覧': [['日時', 'お名前']], '代理店一覧': [] }
  let lockHeld = false
  const mkSheet = (name: string) => ({
    getLastRow: () => sheets[name].length,
    appendRow: (r: any[]) => { sheets[name].push(r) },
    getRange: (a: any, b?: any, c?: any, d?: any) => {
      if (typeof a === 'string') return { setNumberFormat: () => {}, setDataValidation: () => {} }
      const row = a, col = b, nRows = c ?? 1, nCols = d ?? 1
      return {
        getValues: () => Array.from({ length: nRows }, (_, i) => Array.from({ length: nCols }, (_, j) => sheets[name][row - 1 + i]?.[col - 1 + j] ?? '')),
        setValues: (v: any[][]) => { v.forEach((r, i) => { sheets[name][row - 1 + i] = r }) },
      }
    },
    setFrozenRows: () => {},
  })
  const ctx: any = {
    console,
    Utilities: { formatDate: (d: Date, tz: string) => new Intl.DateTimeFormat('sv-SE', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(d) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k: string) => props[k] ?? null }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (s: string) => ({ s, setMimeType() { return this } }) },
    LockService: { getScriptLock: () => ({ tryLock: () => { if (lockHeld) return false; lockHeld = true; return true }, releaseLock: () => { lockHeld = false } }) },
    SpreadsheetApp: {
      openById: () => ({
        getSheetByName: (n: string) => (sheets[n] ? mkSheet(n) : null),
        insertSheet: (n: string) => { sheets[n] = []; return mkSheet(n) },
      }),
      newDataValidation: () => ({ requireValueInList() { return this }, build() { return {} } }),
      flush: () => {},
    },
  }
  vm.createContext(ctx)
  vm.runInContext(readFileSync(path.join(__dirname, '../../apps-script/kr-messenger-leads/Code.gs'), 'utf8'), ctx)
  const post = (body: unknown) => ctx.doPost({ postData: { contents: typeof body === 'string' ? body : JSON.stringify(body) } }).s as string
  return { sheets, post, setLock: (v: boolean) => { lockHeld = v } }
}
