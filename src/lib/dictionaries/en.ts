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
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
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
          name: 'About DTV Visa',
          questions: [
            {
              q: 'Can you really get a DTV visa through golf?',
              a: 'Yes, it\'s part of Thailand\'s official "Soft Power Visa Program." Golf is a government-recognized sport, and through our partnership with Ken\'s Golf Bangkok (Thailand PGA-certified), you can legitimately apply for a DTV visa. Our 96% success rate proves it works.',
            },
            {
              q: 'How long is a DTV visa valid?',
              a: 'The DTV visa is valid for 5 years, making it Thailand\'s longest-stay option for digital professionals and retirees.',
            },
            {
              q: 'Is prior golf experience required?',
              a: 'No. This program doesn\'t require golf skills. It\'s designed to support Thailand\'s sports promotion policy, not to develop athletes.',
            },
            {
              q: 'What documents are needed as "proof of residence" for the application?',
              a: 'This document does not prove your permanent home address — it proves that you are legally present in the jurisdiction of the consulate where you apply. You can apply at any Thai consulate or embassy outside Thailand, including from a third country.\n\n[Examples]\n① Applying at a Thai embassy in your home country → driver\'s license, utility bills, etc.\n② Applying in Vietnam while traveling → Vietnamese tourist visa + hotel receipt, or a flight ticket to Thailand\n③ Applying from any other third country → a valid visa for that country, proof of accommodation, or flight tickets\n\n※ Rules for third-country applications vary by consulate (e.g. the Thai Embassy in Seoul may not accept applications from foreign nationals on tourist visas). Always confirm directly with the consulate before applying.\n\n※ Nationals of certain countries designated by the Thai government as "Special Observation Countries" (e.g. Afghanistan, Iran, Iraq, Nigeria, Pakistan) may face restrictions when applying at Thai consulates in third countries. They may need to apply in their home country or submit additional documents such as a criminal record clearance. Please contact us in advance if this applies to you.',
            },
          ],
        },
        {
          id: 'B',
          name: 'Plans & Pricing',
          questions: [
            {
              q: 'What\'s the difference between Silver, Gold, and Platinum?',
              a: 'The plans differ in lesson frequency, course rounds, and facility access. Silver = 12 lessons/year, Gold = 6 one-on-one + 1 course round, Platinum = 12 one-on-one + 4 course rounds.',
            },
            {
              q: 'How do I pay?',
              a: 'We accept bank transfers and credit card payments. Details will be provided after your initial consultation.',
            },
            {
              q: 'What\'s the difference between plans and the agency add-on?',
              a: 'Plans cover your golf school program only. The agency add-on handles all visa paperwork and embassy procedures, plus provides the refund guarantee.',
            },
          ],
        },
        {
          id: 'C',
          name: 'Refunds & Guarantees',
          questions: [
            {
              q: 'What if my visa is rejected?',
              a: 'With the agency plan, we refund 100% of your school fees. Without the agency plan, we refund 50%. The 10,000 THB visa application fee is non-refundable in both cases. (Nationals of South Korea, Malaysia, Singapore, and Tunisia are exempt from this fee under bilateral agreements with Thailand.)',
            },
            {
              q: 'Do I get a refund without the agency plan?',
              a: 'Yes, 50% of school fees. The agency plan provides 100% refund protection.',
            },
            {
              q: 'Is a bank balance certificate alone sufficient, or is a transaction history also needed?',
              a: 'A bank balance certificate showing 500,000+ THB equivalent is required at the time of application.\n\nHowever, there is a growing trend of consulates also requesting 3 months of bank transaction statements (transaction history) in addition to the balance certificate.\n\nWe recommend preparing both documents in advance to be safe.',
            },
          ],
        },
        {
          id: 'D',
          name: 'Lessons & Facilities',
          questions: [
            {
              q: 'Where do the lessons take place?',
              a: 'At Ken\'s Golf Bangkok, our partner facility in Bangkok with indoor and outdoor ranges.',
            },
            {
              q: 'Can I take lessons online?',
              a: 'No, in-person lessons at the facility are required as part of the official program.',
            },
          ],
        },
        {
          id: 'E',
          name: 'General',
          questions: [
            {
              q: 'I heard the visa-free stay period in Thailand is changing from 60 days — what\'s happening?',
              a: 'Thailand\'s Cabinet formally approved reverting the visa-free stay from 60 to 30 days on May 19, 2026 (effective 15 days after publication in the Royal Gazette). This effectively eliminates long-term visa-free stays for Japanese and most Western nationals.\n\nNote: South Korea, Brazil, Peru, Argentina, and Chile are exempt from this change under bilateral agreements and continue to enjoy 90-day visa-free stays.\n\nWith a DTV visa, you can stay up to 180 days per entry (approx. 1 year with the in-country extension), making DTV more valuable than ever.',
            },
            {
              q: 'What\'s the minimum age?',
              a: 'You must be 18+ to apply for a DTV visa. There\'s no maximum age limit.',
            },
            {
              q: 'Can my family join?',
              a: 'Yes, each family member applies individually to their own plan. Contact us for family discounts.',
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
      successMessage: '✓ Submitted! We will contact you within 1 business day.',
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
