import type { Dictionary } from '@/types'

const en: Dictionary = {
  meta: {
    title: 'DTV Club | Thailand Destination Thailand Visa (DTV) Complete Guide',
    description:
      'Everything you need to know about Thailand\'s DTV visa: how to apply, required documents, and life in Thailand. Trusted by a community of 10,000+ members.',
    siteName: 'DTV Club',
  },
  nav: {
    guide: 'Guide',
    requirements: 'Requirements',
    life: 'Life in Thailand',
    softPower: 'Soft Power',
    joinDiscord: 'Join Discord',
  },
  hero: {
    headline: 'Live in Thailand. Long-term. Free.',
    subheadline: 'Your complete resource for the DTV visa — from application to daily life.',
    searchPlaceholder: 'e.g. DTV visa documents, Bangkok rent prices',
    searchButton: 'Search',
    badge: 'Updated for 2025',
  },
  categories: {
    title: 'Explore by Topic',
    items: [
      {
        icon: '🏛️',
        title: 'Embassy Application Guide',
        description: 'Latest procedures and tips for Thai embassies worldwide',
        href: '/guide/embassy',
      },
      {
        icon: '📋',
        title: 'Document Checklist',
        description: 'Complete list of required documents — never miss a thing',
        href: '/requirements',
      },
      {
        icon: '👨‍👩‍👧',
        title: 'Family & Dependent Visa',
        description: 'Moving to Thailand with your family — all you need to know',
        href: '/guide/family',
      },
      {
        icon: '⛳',
        title: 'Soft Power Visa Path',
        description: 'Get your DTV via a government-approved golf school. Money-back guarantee.',
        href: '/soft-power',
      },
    ],
  },
  updates: {
    title: 'Latest Updates & Knowledge Base',
    subtitle: 'Continuously updated with real experiences. Always current with policy changes.',
    readMore: 'Read more',
    articles: [
      {
        category: 'Application Guide',
        title: '2025 Complete DTV Visa Application Manual',
        excerpt:
          'Step-by-step guide to applying at the Thai embassy — with photos, timelines, and insider tips.',
        date: 'April 8, 2025',
      },
      {
        category: 'Soft Power',
        title: 'Golf School DTV: Full Report from Application to Approval',
        excerpt:
          'Everything about getting a DTV via a government-approved golf school — costs, schedule, and pitfalls.',
        date: 'March 25, 2025',
      },
      {
        category: 'Life in Thailand',
        title: 'Bangkok Long-Stay: Condo Rent Prices in 2025',
        excerpt:
          'Current rental rates in Phrom Phong, Asok, and Silom — with recommendations for DTV holders.',
        date: 'March 10, 2025',
      },
    ],
  },
  premium: {
    badge: 'Soft Power Visa',
    title: 'Golf School DTV Acquisition Program',
    subtitle: 'Thailand Government Approved × Golf-Based Program',
    features: [
      'Thai government-certified Soft Power visa program',
      'Beginner-friendly golf lessons',
      'Complete support for DTV application documents',
      'Official recommendation letter and certification',
      'Refund policy if DTV is not approved',
    ],
    cta: 'View Program Details',
    guarantee: 'Refund Available',
  },
  community: {
    memberCount: '10,000+',
    title: 'Join Our Discord Community',
    description:
      'A real-time information hub where DTV holders and applicants connect. Get the latest policy updates, local reports, and peer support — all for free.',
    cta: 'Join Discord for Free',
    stats: [
      { value: '10,000+', label: 'Members' },
      { value: '24/7', label: 'Real-time Info' },
      { value: '5 Languages', label: 'Multilingual Support' },
    ],
  },
  footer: {
    tagline: 'Everything for your long-term stay in Thailand.',
    links: [
      { label: 'Privacy Policy', href: '/golf-dtv#privacy' },
      { label: 'Terms of Use', href: '/golf-dtv#sct' },
      { label: 'Contact', href: '/contact' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
    legal: '© 2025 DTV Club. All rights reserved.',
  },
  aiSummary:
    'DTV Club is a comprehensive information portal dedicated to Thailand\'s Destination Thailand Visa (DTV). It provides application guides, document checklists, Soft Power visa support (via golf schools), life-in-Thailand resources, and access to a Discord community of 10,000+ members. Available in Japanese, English, Chinese, Korean, and Russian.',
  golfDTV: {
    meta: {
      title: 'Golf DTV | Get Your 5-Year Thailand Visa While Playing Golf',
      description:
        'Golf DTV – The first agency to establish golf school-based DTV visa acquisition. Partnership with Thailand PGA-certified professionals ensures your 5-year Thai visa. 96% success rate with 100% refund guarantee (with agency plan).',
    },
    hero: {
      badge: 'Industry First • 96% Success Rate',
      headline: 'Unlock the 5-Year DTV with Golf',
      subheadline: 'Acquire your DTV visa through a golf school partnership. Thailand PGA-certified coaches ensure your success.',
      cta: 'Free Consultation',
    },
    plans: {
      intro: 'Choose Your Plan',
      subtext: 'Select your golf school plan and submit your inquiry. Payment details will be discussed after consultation.',
      feeNote: '※ The visa application fee (approx. 10,000 THB) is a government fee paid directly to the Thai embassy or consulate — separate from our tuition fees. Nationals of South Korea, Malaysia, Singapore, and Tunisia are exempt from this fee under bilateral agreements with Thailand. Tuition prices are subject to Thai VAT (7%).',
      items: [
        {
          name: 'Silver',
          price: 20000,
          currency: 'THB',
          period: 'year',
          description: 'Entry-level plan',
          features: [
            { text: 'DTV application letter & official acceptance', included: true },
            { text: 'Indoor golf facility access', included: true, note: 'Monthly • 12 sessions/year' },
            { text: 'Video curriculum access', included: true, note: 'Monthly • 12 sessions/year' },
            { text: 'Free golf club rental', included: true, note: 'Excludes course rounds' },
            { text: 'Thailand golf course rounds', included: false },
          ],
          cta: 'Consult This Plan',
        },
        {
          name: 'Gold',
          price: 50000,
          currency: 'THB',
          period: 'year',
          badge: 'Most Popular',
          description: 'Standard plan',
          features: [
            { text: 'DTV application letter & official acceptance', included: true },
            { text: 'One-on-one lessons', included: true, note: '6 sessions/year' },
            { text: 'Indoor golf facility access', included: true, note: '12 sessions/year' },
            { text: 'Video curriculum access', included: true, note: '12 sessions/year' },
            { text: 'Thailand golf course rounds', included: true, note: '1 round/year' },
            { text: 'Free golf club rental', included: true, note: 'Excludes course rounds' },
          ],
          cta: 'Consult This Plan',
        },
        {
          name: 'Platinum',
          price: 100000,
          currency: 'THB',
          period: 'year',
          description: 'Premium plan',
          features: [
            { text: 'DTV application letter & official acceptance', included: true },
            { text: 'One-on-one lessons', included: true, note: '12 sessions/year' },
            { text: 'Indoor golf facility access', included: true, note: '12 sessions/year' },
            { text: 'Video curriculum access', included: true, note: '12 sessions/year' },
            { text: 'Thailand golf course rounds', included: true, note: '4 rounds/year' },
            { text: 'Free golf club rental', included: true, note: 'Excludes course rounds' },
          ],
          cta: 'Consult This Plan',
        },
      ],
    },
    addon: {
      label: 'Optional Add-on',
      title: 'DTV Application Agency Plan',
      description: 'Full visa application support from document preparation to embassy submission. 100% school fee refund if rejected.',
      price: 10000,
      features: [
        'Complete document preparation & review',
        'Embassy application & interview support',
        'Full refund of school fees if visa rejected',
        'Visa application fee (10,000 THB) non-refundable',
      ],
      cta: 'Add Agency Plan',
    },
    fiveYearPlan: {
      badge: 'Bundle Discount',
      title: '5-Year Bundle Plan',
      discount: '20% OFF Years 2–5',
      description: 'Year 1 at the standard rate, years 2–5 at 20% off.',
      note: '※ Requires upfront full payment. DTV visa is valid for 5 years, but immigration may request proof of continued enrollment upon re-entry or extension. Maintaining enrollment covers this requirement. Optional.',
      cta: 'Learn More',
    },
    annualRenewal: {
      badge: 'Renewal Discount',
      title: 'Annual Renewal Plan',
      discount: '10% OFF Each Renewal',
      description: 'Continue with your chosen plan at 10% off at each annual renewal.',
      note: '※ No lump-sum payment required — pay each year at renewal. Maintaining enrollment allows you to provide immigration with proof of continued study. Optional.',
      cta: 'Learn More',
    },
    faq: {
      title: 'Frequently Asked Questions',
      categories: [
        {
          id: 'A',
          name: 'Can I Apply?',
          questions: [
            {
              q: 'I am currently in Thailand. Can I still apply?',
              a: 'Yes, but the DTV visa must generally be applied for outside Thailand at a Thai embassy or consulate. If you are currently in Thailand, you will usually need to leave the country first and submit your application from a nearby country or from your home country.',
            },
            {
              q: 'Where do Thailand-based applicants usually apply from?',
              a: 'Many Thailand-based applicants consider applying through Thai embassies or consulates in nearby countries such as Vietnam, Laos, Malaysia, or Japan. However, the most suitable location depends on your nationality, immigration status, and timing. Since third-country application rules and required documents can vary by embassy or consulate, we recommend checking with us in advance before you travel.',
            },
          ],
        },
        {
          id: 'B',
          name: 'Required Documents (Bank Balance, Passport, and Related Items)',
          questions: [
            {
              q: 'Can I use a bank account from any country for the financial proof?',
              a: 'In general, your financial proof should be issued under your own name and clearly show the required balance. The document should be in English or officially translated. Investment accounts, brokerage accounts, and crypto asset accounts are often less likely to be accepted. In addition, a complete PDF statement is usually required rather than cropped images or screenshots. If you are unsure about your account type or document format, please contact us in advance.',
            },
            {
              q: 'Do I need to maintain THB 500,000 for three months?',
              a: 'Yes, you are generally required to show at least THB 500,000 in financial proof. In the past, a balance certificate alone was sometimes enough, but the review process has become stricter, and many embassies and consulates now request bank transaction statements for the most recent three months as well. For that reason, it is important not to rely on a last-minute deposit only. In practice, it is safer to maintain the required balance from before filing until your visa is approved. If your funds were deposited only shortly before application, you may be asked to provide additional explanation.',
            },
            {
              q: 'What counts as proof of residence for DTV application purposes?',
              a: 'In this context, proof of residence does not simply mean your current home address. It means proof that you are legally staying within the jurisdiction of the Thai embassy or consulate where you are applying. Since DTV applications can be submitted outside Thailand, some applicants also apply while staying in a third country.\n\nTypical examples:\n① Applying at the Thai embassy or consulate in your home country → Driver\'s license, utility bill, or similar local address documents\n② Applying at the Thai consulate in Hanoi while staying in Vietnam → Vietnamese tourist visa plus hotel receipt, or a flight ticket related to your stay\n③ Applying from another third country → A valid visa for that country, accommodation proof, or flight documentation\n\nThird-country application rules vary by embassy and consulate. Some missions do not accept applications from foreign nationals who are staying only on a tourist visa. You should therefore confirm the latest rules directly with the specific embassy or consulate before applying.\n\nNationals of countries that may be subject to special review by Thai authorities, such as Afghanistan, Iran, Iraq, Nigeria, or Pakistan, may face restrictions on third-country applications. In some cases, applying from the home country or submitting additional documents such as a police clearance certificate may be required. If this may apply to you, please contact us before proceeding.',
            },
            {
              q: 'How long does it take to receive the school documents after I sign up?',
              a: 'After your course payment is confirmed, we usually issue the official DTV application documents, such as the acceptance letter and study certificate, within 3 to 5 business days. If additional confirmation is needed due to individual circumstances, processing may take slightly longer.',
            },
            {
              q: 'What should I do if my passport has limited validity remaining?',
              a: 'Although DTV is generally issued as a five-year visa, your passport should still have at least 12 months of validity remaining at the time of application. In many cases, you may also be asked to submit images of the pages in your passport that contain visa stamps. If your passport is close to expiry or has many stamped pages already filled, renewing or reissuing it in advance may make the application process smoother.',
            },
          ],
        },
        {
          id: 'C',
          name: 'Golf Experience and Lesson Attendance',
          questions: [
            {
              q: 'Can I apply even if I have never played golf before?',
              a: 'Yes, you can. Golf DTV is not designed for professional golf training. It is structured as a program centered on golf as part of a Thai soft-power and cultural activity route. Even complete beginners who have never held a golf club can follow the course and receive the required documentation. Golf clubs are also available free of charge.',
            },
            {
              q: 'Do I need to actually attend the lessons in person?',
              a: 'Yes. Golf DTV is designed on the basis of in-person participation. The program is intended to involve actual lesson attendance, and online-only participation is not available.',
            },
            {
              q: 'Where do the lessons take place?',
              a: 'Lessons are provided through a partner facility, and they are generally held at Ken\'s Golf Bangkok in central Bangkok.',
            },
          ],
        },
        {
          id: 'D',
          name: 'Fees and Refunds',
          questions: [
            {
              q: 'What is the total cost?',
              a: 'In general, the total cost includes the school fee plus the visa application fee paid to the Thai embassy or consulate of THB 10,000, or the equivalent in local currency depending on the place of application. Additional costs apply if you include dependent applications or a visa support service. If you want to know the total cost for your own case, please feel free to contact us.',
            },
            {
              q: 'If my visa is refused by the embassy, will I receive a refund?',
              a: 'Refund terms depend on the plan you choose.\n\n・Visa Support Plan: If your visa is refused, we offer a full refund of both the school fee and the support fee.\n・Standard Plan: If the refusal is not caused by missing or incorrect school documents, we will refund the applicable amount after deducting the cancellation fee or in accordance with the applicable refund condition.\n・Important Note: Refusals caused by clearly applicant-related reasons, such as insufficient bank balance, criminal history, or overstay history, are not eligible for refund.\n\nPlease see our <a href="#refund" style="color:#0d4f3c;text-decoration:underline;">Refund Policy</a> for full details.',
            },
            {
              q: 'What is the difference between the visa support plan and the standard plan?',
              a: 'The standard plan mainly covers the course-related side of the process, while the visa support plan also includes document preparation guidance and assistance with the visa application process. Refund conditions also differ depending on the plan, so we recommend reviewing the differences before applying.',
            },
            {
              q: 'What payment methods are available?',
              a: 'We may offer multiple payment methods, including bank transfer and card payment. Available options and settlement currency may vary, so please follow the payment guidance provided at the time of application.',
            },
          ],
        },
        {
          id: 'E',
          name: 'Basic Visa Comparisons',
          questions: [
            {
              q: 'What is the DTV visa?',
              a: 'DTV is a long-stay visa introduced by the Thai government. In general, it is a five-year multiple-entry visa, allowing stays of up to 180 days per entry, with the possibility of an additional 180-day extension inside Thailand. It is different from work visas and retirement visas in both eligibility and structure, so it is important to compare routes and choose the one that best fits your purpose.',
            },
            {
              q: 'Can I really apply for DTV through golf lessons?',
              a: 'Yes. To apply under the DTV soft-power route, it is not enough to simply attend casual lessons. The program must be supported by an official curriculum that meets the relevant Thai government-related requirements, along with documentation prepared in line with the applicable standards. Our school provides the structure, experience, and application know-how required for the Golf DTV route, and many applicants have already obtained their five-year DTV visa through our program.',
            },
            {
              q: 'How is this different from Thailand Elite (Thailand Privilege)?',
              a: 'The main difference is upfront cost and the basis of eligibility. Thailand Privilege requires a high membership fee, while Golf DTV is structured around the school tuition and the embassy application fee. As a result, it offers a more accessible path for people seeking a similar long-term stay period at a significantly lower initial cost.',
            },
            {
              q: 'How is this different from an ED visa or a retirement visa?',
              a: 'An ED visa is centered on school enrollment and attendance control, whereas Golf DTV follows the DTV framework. It offers a more flexible stay without the frequent renewal burden and attendance or language-test obligations commonly associated with some ED visa arrangements.\n\nIt is also different from a retirement visa in that it does not require you to keep THB 800,000 in a Thai bank account on an ongoing basis, and there is no upper age limit. For that reason, some applicants also consider switching from a retirement visa to DTV.',
            },
          ],
        },
        {
          id: 'F',
          name: 'Family Accompaniment',
          questions: [
            {
              q: 'Can my spouse or children apply with me?',
              a: 'Yes, they can. The legal spouse of the main DTV applicant, as well as children under the age of 20, can apply together under the DTV dependent category.\n\nOur dependent visa support fees are as follows.\n・First dependent (spouse or unmarried child under 20): +10,000 THB\n・Second and each additional dependent: +5,000 THB per person\n\nPlease note that the embassy visa application fee of 10,000 THB equivalent is also charged separately for each dependent, just as it is for the main applicant. If you are interested, please select the dependent visa option on the inquiry form.',
            },
            {
              q: 'Do my family members also need to enroll in the golf school?',
              a: 'No, they do not. For a Golf DTV application, only the main applicant needs to enroll in the school. Family members can apply without paying school tuition as long as they prepare documents proving the family relationship, such as a marriage certificate or birth certificate.',
            },
          ],
        },
        {
          id: 'G',
          name: 'After Approval and Renewal-Related Options',
          questions: [
            {
              q: 'Will I need an updated school certificate after the first year?',
              a: 'The DTV visa itself remains valid for five years once issued. However, based on the latest operational practices our school has confirmed with Thai consular posts in multiple countries, there are cases where immigration officers request an updated document showing that the applicant is still continuing the relevant soft-power activity when re-entering Thailand or applying for a 180-day in-country extension.\n\nFor that reason, we offer a school continuation option that allows us to issue updated acceptance letters or continuation certificates at a lower cost from the second year onward. This is designed for applicants who want to reduce risk when re-entering Thailand or extending their stay. Please contact us through the inquiry form for more details.',
            },
            {
              q: 'What is the 5-year lump-sum plan?',
              a: 'This is an option that allows you to contract the continuation program for five years in one arrangement. The first year is charged at the normal selected-plan rate, and years two through five are offered at 20% off the regular price. Full payment is required upfront. We issue updated acceptance letters whenever needed for re-entry or 180-day extension procedures. This option is voluntary and is recommended for those who want stronger long-term preparation in case supporting documents are requested after the initial school period.',
            },
            {
              q: 'What is the annual renewal plan?',
              a: 'This is a yearly continuation option. Each renewal is available at 10% off the regular price of your selected school plan. Unlike the five-year lump-sum plan, this option is paid at each renewal rather than all at once, giving you more flexibility. This is also a voluntary option.',
            },
          ],
        },
      ],
    },
    inquiry: {
      title: '4-Step Inquiry Process',
      description: 'Simple and straightforward. Payment details will be discussed separately.',
      steps: [
        { number: 1, label: 'Select Plan' },
        { number: 2, label: 'Enter Info' },
        { number: 3, label: 'Review' },
        { number: 4, label: 'Contact Agent' },
      ],
      cta: 'Get Free Consultation',
    },
    trust: {
      successRate: '96%',
      title: 'Why Trust Golf DTV',
      items: [
        'Industry first golf school DTV acquisition',
        'Supervised by state-certified legal expert',
        '100% refund guarantee (with agency plan)',
        'Direct liaison with Thai embassies worldwide',
      ],
    },
    whySafe: {
      sectionLabel: 'WHY GOLFDTV',
      title: 'Why Our DTV Support Is Reliable and Secure',
      items: [
        {
          number: '01',
          title: 'Direct Liaison with Thai Embassies Worldwide',
          subtitle: 'Fact-based Operation',
          body: 'DTV is a newly introduced visa category, and grey areas exist that are not reflected on official websites — including discretionary criteria applied by individual immigration officers. We never rely on internet rumors or outdated information. Our team regularly contacts Thai embassies and consulates across the globe to stay current with official screening standards and real-world immigration practices. This meticulous fact-checking allows us to prepare documents that eliminate risk at the application stage.',
        },
        {
          number: '02',
          title: 'Supervised by a Japanese State-Certified Legal Expert',
          subtitle: 'Certified Legal Specialist — Immigration & Documentation (Gyoseishoshi)',
          body: 'Our visa acquisition framework and compliance procedures are fully supervised by a holder of Japan\'s national license in administrative law — a Gyoseishoshi (State-Certified Legal Specialist in Immigration & Documentation). This rigorous legal oversight ensures that every document we prepare meets both the letter and spirit of Thai immigration law, minimizing the risk of rejection due to errors or inconsistencies. When a Japanese-standard legal expert stands behind your application, confidence is built-in.',
        },
      ],
    },
    flow: {
      sectionLabel: 'HOW IT WORKS',
      title: 'Complete DTV Visa Application Flow',
      phases: [
        {
          number: '1',
          title: 'Enrollment & Document Preparation',
          duration: 'Approx. 1 week',
          steps: [
            { number: '1', title: 'Inquiry & Plan Confirmation', body: 'Choose your plan and decide whether to add the agency service. Confirm which country you are based in (for embassy selection).' },
            { number: '2', title: 'Pay Tuition Fee', body: 'Transfer the tuition fee via our designated payment method.' },
            { number: '3', title: 'Official Documents Issued', body: 'Within 1–3 business days of payment, we email you the enrollment letter and other required Thai-side documents in PDF.' },
            { number: '4', title: 'Prepare Personal Documents', body: 'Gather: passport (6+ months validity), photo, proof of residence, and bank statement (500,000+ THB equivalent, in English).' },
          ],
        },
        {
          number: '2',
          title: 'Online Application via Thai e-Visa System',
          duration: 'Approx. 1–2 hours',
          note: 'With the agency plan, our staff handles this step on your behalf.',
          steps: [
            { number: '5', title: 'Create Account', body: 'Register at the official Thai E-Visa website (thaievisa.go.th) with your email and password.' },
            { number: '6', title: 'Fill in Details & Upload Documents', body: 'Enter your application information and upload all documents from Phase 1.' },
            { number: '7', title: 'Pay Visa Application Fee', body: 'Pay approx. 10,000 THB by credit card. Payment completes your official application submission.' },
          ],
        },
        {
          number: '3',
          title: 'Embassy / Consulate Review',
          duration: 'Approx. 1–3 weeks',
          steps: [
            { number: '8', title: 'Under Review (Processing)', body: 'Your application status changes to "Processing." No further action required during this period.' },
            { number: '9', title: 'Additional Documents (if requested)', body: 'The consular officer may request clarifications via email. Agency plan clients: we handle all responses.' },
          ],
        },
        {
          number: '4',
          title: 'Visa Approval & Entry to Thailand',
          steps: [
            { number: '10', title: 'Approval Email & e-Visa PDF', body: 'Once approved, you receive an email with your e-Visa attached as a PDF. No passport sticker required.' },
            { number: '11', title: 'Print & Enter Thailand', body: 'Print the e-Visa PDF and present it with your passport at immigration. Receive your DTV / 180-day entry stamp and begin your long-term stay.' },
          ],
        },
      ],
    },
    ticker: [
      'Industry first: Golf school DTV visa',
      '96% success rate',
      'Thailand PGA-certified pro partnership',
      '5-year visa · Multiple entry',
      'No golf experience required',
      '100% refund guarantee (agency plan)',
    ],
    form: {
      planLabel: 'Preferred Plan',
      planPlaceholder: 'Select a plan',
      planUndecided: 'Not decided yet · Would like to consult',
      agencyLabel: 'I want DTV Application Agency Service',
      agencyBullets: ['+10,000 THB +VAT 7% (additional fee)', 'Full support from document prep to embassy submission', 'Rejection: 100% school fee refund guarantee'],
      nationalityLabel: 'Nationality',
      nationalityPlaceholder: 'Type or select your country',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      required: 'Required',
      sourceLabel: 'How did you hear about us?',
      sourceNote: 'Select all that apply — optional',
      sourceOptions: [
        'Instagram',
        'X (Twitter)',
        'Facebook',
        'Facebook Ad',
        'YouTube',
        'Google Search',
        'Referral from friends / acquaintances',
        'Blog or article',
        'DTV Club website (dtvclub.com)',
        'Other',
      ],
      referralLabel: 'Referral Code',
      referralNote: 'If you have one',
      referralPlaceholder: 'e.g. GD-XXXX',
      messageLabel: 'Questions / Message',
      messagePlaceholder: 'Feel free to ask anything',
      privacyConsent: 'I agree to the Privacy Policy',
      refundPolicyConsent: 'I have read and agree to the Refund Policy',
      restrictedWarning: {
        title: 'Notice: Your selected nationality is designated as a "Special Scrutiny Country" by the Thai government',
        bullets: [
          'Applications at Thai consulates in third countries (e.g. Japan) may be restricted',
          'Additional documents such as a criminal record certificate may be required',
          'You may need to apply from your home country or a country where you hold a long-term visa',
          'Even with the Agency Plan, refunds are capped at 50% of school fees if the visa is rejected',
        ],
        footer: 'Please contact us before applying.',
      },
      dependentVisaLabel: 'Dependent Visa (Spouse / Children)',
      dependentVisaConsult: 'I\'d like to discuss this',
      dependentVisaNo: 'Not needed',
      dependentVisaNote: 'About dependent visa fees and procedures',
      successMessage: '✓ Submitted! We will contact you within 1 business day.',
      receiptNote: 'When contacting us via Messenger,\nplease send this reference number first.',
      messengerCta: 'Chat on Messenger',
    },
    nav: {
      plans: 'Pricing Plans',
      flow: 'How It Works',
      faq: 'FAQ',
      inquiry: 'Contact',
    },
    footerNav: {
      about: 'The pioneer that established golf school-based DTV visa acquisition. Supporting your 5-year Thai visa with Thailand PGA-certified professionals.',
      services: 'Services',
      support: 'Support',
      serviceLinks: [['Plans', '#plans'], ['FAQ', '#faq'], ['Contact', '#inquiry']],
      supportLinks: [['Privacy Policy', '#privacy'], ['Legal Notice', '#sct'], ['About Us', '#company']],
      copyright: '© 2024 GolfDTV. All rights reserved.',
      disclaimer: 'This service provides visa application support and does not guarantee visa approval.',
    },
    affiliate: {
      footerLink: 'Referral & Partner Program',
      footerDesc: 'Interested in referring friends or becoming a partner?',
      footerCta: 'Learn more →',
      modalTitle: 'Partner & Referral Program',
      modalDesc: 'We welcome inquiries from those who would like to introduce our service or partner with us.',
      nameLabel: 'Name',
      emailLabel: 'Email',
      platformLabel: 'Platform / Channel',
      platformPlaceholder: 'SNS, blog, website, etc. (optional)',
      messageLabel: 'Message / Questions',
      messagePlaceholder: 'Tell us about yourself',
      required: 'Required',
      submit: 'Send',
      success: "✓ Sent! We'll be in touch shortly.",
    },
  },
}

export default en
