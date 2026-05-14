import type { Dictionary } from '@/types'

const zh: Dictionary = {
  meta: {
    title: 'DTV Club | 泰国目的地签证（DTV）完全指南',
    description:
      '泰国DTV签证申请方法、所需材料、在泰生活信息全面汇总。超过10,000名成员的可信赖信息门户。',
    siteName: 'DTV Club',
  },
  nav: {
    guide: '指南',
    requirements: '所需材料',
    life: '泰国生活',
    softPower: '软实力签证',
    joinDiscord: '加入Discord',
  },
  hero: {
    headline: '在泰国，长期自由生活。',
    subheadline: '从DTV签证申请到在泰生活，所有信息尽在此处。',
    searchPlaceholder: '例：DTV签证材料、曼谷房租行情',
    searchButton: '搜索',
    badge: '2025年最新信息',
  },
  categories: {
    title: '按主题浏览',
    items: [
      {
        icon: '🏛️',
        title: '大使馆申请指南',
        description: '全球各地泰国大使馆的最新手续与申请流程',
        href: '/guide/embassy',
      },
      {
        icon: '📋',
        title: '所需材料清单',
        description: '申请所需全部材料列表，确保万无一失',
        href: '/requirements',
      },
      {
        icon: '👨‍👩‍👧',
        title: '家庭与随行签证',
        description: '全家移居泰国所需了解的手续与注意事项',
        href: '/guide/family',
      },
      {
        icon: '⛳',
        title: '软实力签证通道',
        description: '通过政府认可高尔夫学校获取DTV，全额退款保证',
        href: '/soft-power',
      },
    ],
  },
  updates: {
    title: '最新资讯与知识库',
    subtitle: '基于真实经验持续更新，及时反映政策变化。',
    readMore: '阅读更多',
    articles: [
      {
        category: '申请指南',
        title: '2025年最新版：DTV签证申请完全手册',
        excerpt: '附图片的泰国大使馆DTV申请全流程详解，预约方式到取签一文全搞定。',
        date: '2025年4月8日',
      },
      {
        category: '软实力签证',
        title: '高尔夫学校DTV：从申请到获签全程报告',
        excerpt: '详解通过政府认可高尔夫学校获取DTV签证的全部流程，费用、时间安排与注意事项一览。',
        date: '2025年3月25日',
      },
      {
        category: '泰国生活',
        title: '曼谷长期居住：2025年公寓租金行情',
        excerpt: '素坤逸、阿索克、是隆区最新租金行情及DTV持有者推荐房源指南。',
        date: '2025年3月10日',
      },
    ],
  },
  premium: {
    badge: '软实力签证',
    title: '高尔夫学校DTV获取计划',
    subtitle: '泰国政府认可 × 高尔夫取得',
    features: [
      '泰国政府认证的软实力签证项目',
      '初学者高尔夫课程',
      'DTV申请所需全套文件支持',
      '官方推荐信和证明书',
      'DTV未获批时提供退款',
    ],
    cta: '查看项目详情',
    guarantee: '退款保证',
  },
  community: {
    memberCount: '超过10,000人',
    title: '加入我们的Discord社区',
    description:
      'DTV签证持有者与申请者实时信息共享社区。免费获取最新政策动态、本地报告和互助支持。',
    cta: '免费加入Discord',
    stats: [
      { value: '10,000+', label: '成员' },
      { value: '24/7', label: '实时信息' },
      { value: '5种语言', label: '多语言支持' },
    ],
  },
  footer: {
    tagline: '泰国长期居住的一切，尽在这里。',
    links: [
      { label: '隐私政策', href: '/privacy' },
      { label: '使用条款', href: '/terms' },
      { label: '联系我们', href: '/contact' },
      { label: '网站地图', href: '/sitemap.xml' },
    ],
    legal: '© 2025 DTV Club. All rights reserved.',
  },
  golfDTV: {
    meta: {
      title: 'Golf DTV | 打高尔夫球同时获得5年泰国签证',
      description:
        'Golf DTV – 首个通过高尔夫学校获取DTV签证的机构。与泰国PGA认证专业人士合作，96%成功率，100%退款保证（含服务套餐）。',
    },
    hero: {
      badge: '业界首创 • 96% 成功率',
      headline: '畅享高尔夫，轻松解锁5年DTV签证',
      subheadline: '通过高尔夫学校合作获取DTV签证。泰国PGA认证教练确保成功。',
      cta: '免费咨询',
    },
    plans: {
      intro: '选择您的计划',
      subtext: '选择高尔夫学校计划并提交咨询。付款详情将在咨询后讨论。',
      feeNote: '※ 签证申请费（约10,000泰铢）是直接支付给泰国大使馆或领事馆的政府费用，与本公司费用分开。',
      items: [
        {
          name: 'Silver',
          price: 20000,
          currency: 'THB',
          period: 'year',
          description: '入门级套餐',
          features: [
            { text: 'DTV申请信 & 官方录取', included: true },
            { text: '室内高尔夫球设施使用权', included: true, note: '月度 • 12次/年' },
            { text: '视频课程访问权', included: true, note: '月度 • 12次/年' },
            { text: '免费高尔夫球杆租赁', included: true, note: '不含球场轮数' },
            { text: '泰国高尔夫球场轮数', included: false },
          ],
          cta: '咨询此计划',
        },
        {
          name: 'Gold',
          price: 50000,
          currency: 'THB',
          period: 'year',
          badge: '最受欢迎',
          description: '标准套餐',
          features: [
            { text: 'DTV申请信 & 官方录取', included: true },
            { text: '一对一课程', included: true, note: '6次/年' },
            { text: '室内高尔夫球设施使用权', included: true, note: '12次/年' },
            { text: '视频课程访问权', included: true, note: '12次/年' },
            { text: '泰国高尔夫球场轮数', included: true, note: '1轮/年' },
            { text: '免费高尔夫球杆租赁', included: true, note: '不含球场轮数' },
          ],
          cta: '咨询此计划',
        },
        {
          name: 'Platinum',
          price: 100000,
          currency: 'THB',
          period: 'year',
          description: '高级套餐',
          features: [
            { text: 'DTV申请信 & 官方录取', included: true },
            { text: '一对一课程', included: true, note: '12次/年' },
            { text: '室内高尔夫球设施使用权', included: true, note: '12次/年' },
            { text: '视频课程访问权', included: true, note: '12次/年' },
            { text: '泰国高尔夫球场轮数', included: true, note: '4轮/年' },
            { text: '免费高尔夫球杆租赁', included: true, note: '不含球场轮数' },
          ],
          cta: '咨询此计划',
        },
      ],
    },
    addon: {
      label: '可选附加项',
      title: 'DTV签证申请代理服务',
      description: '从文件准备到使馆提交的全套签证申请支持。签证被拒时，100%退还学费。',
      price: 10000,
      features: [
        '完整文件准备和审核',
        '使馆申请和面试支持',
        '签证被拒时全额退还学费',
        '签证申请费（10,000泰铢）不可退款',
      ],
      cta: '添加代理服务',
    },
    faq: {
      title: '常见问题',
      categories: [
        {
          id: 'A',
          name: '关于DTV签证',
          questions: [
            {
              q: '真的可以通过高尔夫获得DTV签证吗？',
              a: '是的，这是泰国官方"软实力签证计划"的一部分。高尔夫是政府认可的运动，通过我们与Ken\'s Golf Bangkok（泰国PGA认证）的合作，您可以合法申请DTV签证。我们的96%成功率证明了这一点。',
            },
            {
              q: 'DTV签证有效期有多长？',
              a: 'DTV签证有效期为5年，是泰国最长的居留选项。',
            },
            {
              q: '需要之前的高尔夫经验吗？',
              a: '不需要。本计划不要求高尔夫技能。这是为了支持泰国的体育推广政策，而不是为了培养运动员。',
            },
            {
              q: '申请材料中的"居住证明"需要提供什么文件？',
              a: '这份材料证明的不是您的"固定住址"，而是"申请时合法居留于该领事馆管辖区域"。DTV可在泰国境外的任何泰国领事馆或大使馆申请，因此从第三国申请也完全没有问题。具体示例：①在本国领事馆申请 → 驾驶证、水电费账单等 ②在越南河内领事馆申请（越南体留中）→ 越南旅游签证 + 酒店收据，或飞往泰国的机票 ③从其他第三国申请 → 该国有效签证、住宿证明或机票之一。注意：第三国申请规定因领事馆而异（例如：首尔泰国大使馆可能不接受外国人持旅游签证申请）。申请前请务必直接向相关领事馆确认。',
            },
          ],
        },
        {
          id: 'B',
          name: '套餐和价格',
          questions: [
            {
              q: 'Silver、Gold和Platinum之间有什么区别？',
              a: '套餐在课程频率、球场轮数和设施使用方面有所不同。Silver = 12节课/年，Gold = 6节一对一+1轮球场，Platinum = 12节一对一+4轮球场。',
            },
            {
              q: '如何支付？',
              a: '我们接受银行转账和信用卡支付。详情将在初步咨询后提供。',
            },
            {
              q: '套餐和代理服务附加项之间有什么区别？',
              a: '套餐仅涵盖您的高尔夫学校计划。代理服务处理所有签证文件和使馆程序，并提供退款保证。',
            },
          ],
        },
        {
          id: 'C',
          name: '退款和保证',
          questions: [
            {
              q: '如果签证被拒怎么办？',
              a: '使用代理服务，我们退还100%学费。不使用代理服务，退还50%。10,000泰铢签证申请费在两种情况下都不可退款。',
            },
            {
              q: '不购买代理服务可以退款吗？',
              a: '是的，退还50%学费。代理服务提供100%退款保护。',
            },
          ],
        },
        {
          id: 'D',
          name: '课程和设施',
          questions: [
            {
              q: '课程在哪里进行？',
              a: '在Ken\'s Golf Bangkok进行，这是我们在曼谷的合作设施，拥有室内和室外练习场。',
            },
            {
              q: '可以在线学习吗？',
              a: '不行，必须在设施进行面对面课程，这是官方计划的一部分。',
            },
          ],
        },
        {
          id: 'E',
          name: '常见问题',
          questions: [
            {
              q: '最低年龄是多少？',
              a: '申请DTV签证必须年满18岁。没有最高年龄限制。',
            },
            {
              q: '我的家人可以参加吗？',
              a: '可以，每个家庭成员单独申请各自的套餐。请与我们联系了解家庭优惠。',
            },
          ],
        },
      ],
    },
    inquiry: {
      title: '4步咨询流程',
      description: '简单直接。付款详情将单独讨论。',
      steps: [
        { number: 1, label: '选择套餐' },
        { number: 2, label: '输入信息' },
        { number: 3, label: '审核' },
        { number: 4, label: '与代理联系' },
      ],
      cta: '免费咨询',
    },
    trust: {
      successRate: '96%',
      title: '为什么选择Golf DTV',
      items: [
        '业界首创的高尔夫DTV签证取得实绩',
        '日本国家认证法务专家全程监督',
        '申请拒签时学费100%退款保证',
        '与全球泰国大使馆直接联络体系',
      ],
    },
    whySafe: {
      sectionLabel: 'WHY GOLFDTV',
      title: '我们的DTV签证服务安全可靠的原因',
      items: [
        {
          number: '01',
          title: '与全球泰国大使馆及领事馆直接联络',
          subtitle: 'Fact-based Operation',
          body: 'DTV是一项新推出的签证类别，存在官方网站未涵盖的灰色地带，以及签证官的自由裁量标准。我们从不依赖网络传言或过时信息，而是定期直接联络各国泰国大使馆及领事馆，始终掌握最新官方审核标准和移民实际操作动态。这种严谨的信息核实方式，使我们能够在申请阶段最大程度降低拒签风险。',
        },
        {
          number: '02',
          title: '日本国家认证法务专家（行政书士）全程监督',
          subtitle: 'Certified Legal Specialist — Immigration & Documentation',
          body: '我们的签证申请方案和合规体系，由日本国家资格认证的"行政书士"（出入境管理及法务手续专家）全程监督。这种严格的法律审核确保每份提交的文件均符合泰国移民法要求，有效防止因文件缺陷导致的申请被拒风险。在日本最高法律标准的保障下，让您安心无忧地完成签证申请。',
        },
      ],
    },
    flow: {
      sectionLabel: 'HOW IT WORKS',
      title: 'DTV签证申请完整流程',
      phases: [
        {
          number: '1',
          title: '学校报名与材料准备',
          duration: '所需时间：约1周',
          steps: [
            { number: '1', title: '咨询与确认方案', body: '选择方案并决定是否添加代理服务。确认您目前居住的国家（用于选择大使馆）。' },
            { number: '2', title: '支付学费', body: '通过我方指定汇款方式支付学费。' },
            { number: '3', title: '发放官方证明文件', body: '确认收款后1〜3个工作日内，以PDF形式发送入学许可证等泰方所需文件。' },
            { number: '4', title: '准备个人文件', body: '护照（有效期6个月以上）、照片、居住证明、银行存款证明（50万泰铢以上，英文版）。' },
          ],
        },
        {
          number: '2',
          title: '通过泰国e-Visa系统在线申请',
          duration: '所需时间：约1〜2小时',
          note: '选择代理服务的客户，此步骤由我方工作人员代为处理。',
          steps: [
            { number: '5', title: '创建账户', body: '在泰国e-Visa官方网站（thaievisa.go.th）注册账户。' },
            { number: '6', title: '填写信息并上传文件', body: '填写申请信息，上传第一阶段准备的所有文件。' },
            { number: '7', title: '支付签证申请费', body: '通过信用卡支付约10,000泰铢的申请费，支付完成即为正式受理。' },
          ],
        },
        {
          number: '3',
          title: '大使馆/领事馆审查',
          duration: '所需时间：约1〜3周',
          steps: [
            { number: '8', title: '审查中（Processing）', body: '申请状态变为"Processing"，等待期间无需特别操作。' },
            { number: '9', title: '补充材料（如有要求）', body: '审查官可能通过邮件要求补充材料。代理服务客户由我方全程处理。' },
          ],
        },
        {
          number: '4',
          title: '签证批准与入境泰国',
          steps: [
            { number: '10', title: '收到批准邮件与e-Visa', body: '审查完成后，收到附有PDF格式e-Visa的批准邮件。无需在护照上贴签。' },
            { number: '11', title: '打印并入境泰国', body: '打印e-Visa（PDF）与护照一同提交入境审查，获取DTV/180天入境印章，开始长期居留。' },
          ],
        },
      ],
    },
    ticker: [
      '业界首创：高尔夫学校DTV签证',
      '96%成功率',
      '泰国PGA认证专业人士合作',
      '5年有效·多次入境',
      '无需高尔夫经验',
      '100%退款保证（含代理服务）',
    ],
    form: {
      planLabel: '意向方案',
      planPlaceholder: '请选择方案',
      planUndecided: '尚未决定，希望咨询',
      agencyLabel: '我希望使用DTV申请代理服务',
      agencyBullets: ['+10,000 THB（追加费用）', '从准备文件到大使馆申请全程代理', '拒签时：全额退还学费'],
      nationalityLabel: '国籍',
      nationalityPlaceholder: '输入或选择国家',
      nameLabel: '姓名',
      emailLabel: '电子邮件',
      required: '必填',
      referralLabel: '推荐码',
      referralNote: '如有',
      referralPlaceholder: '例：GD-XXXX',
      messageLabel: '问题/留言',
      messagePlaceholder: '请随时咨询',
      privacyConsent: '我同意隐私政策',
      successMessage: '✓ 提交成功！我们将在1个工作日内与您联系。',
    },
    nav: {
      plans: '价格方案',
      flow: '签证办理流程',
      faq: '常见问题',
      inquiry: '联系我们',
    },
    footerNav: {
      about: '业界首创，通过高尔夫学校获取DTV签证的专业机构。与泰国PGA认证专业人士合作，确保您的5年泰国签证。',
      services: '服务',
      support: '支持',
      serviceLinks: [['签证办理流程', '#flow'], ['方案', '#plans'], ['常见问题', '#faq'], ['联系我们', '#inquiry']],
      supportLinks: [['隐私政策', '#privacy'], ['法律声明', '#sct'], ['关于我们', '#company']],
      copyright: '© 2024 GolfDTV. All rights reserved.',
      disclaimer: '本服务提供签证申请支持，不保证签证获批。',
    },
  },
  aiSummary:
    'DTV Club是专注于泰国目的地签证（DTV）的综合信息门户，提供申请指南、材料清单、软实力签证支持（高尔夫学校等）、在泰生活资讯及超过10,000名成员的Discord社区入口。支持日语、英语、中文、韩语和俄语。',
}

export default zh
