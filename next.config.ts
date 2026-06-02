import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // i18n is handled via middleware + [lang] route segment
  async redirects() {
    return [
      {
        source: '/:lang/dtv-required-documents',
        destination: '/:lang/requirements',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-status-after-application',
        destination: '/ja/blog/dtv-processing-time',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-reapply-checklist',
        destination: '/ja/blog/dtv-rejection-reasons',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-family-checklist',
        destination: '/ja/blog/dtv-family-documents',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-pre-departure-checklist',
        destination: '/ja/blog/dtv-life-setup',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-first-30-days',
        destination: '/ja/blog/dtv-life-setup',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-fee-by-nationality',
        destination: '/ja/blog/dtv-application-nationality-notes',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-before-you-apply',
        destination: '/ja/blog/dtv-application',
        permanent: true,
      },
      {
        source: '/ja/blog/dtv-comparison-checkpoints',
        destination: '/ja/blog/thailand-long-stay-visa-comparison',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
