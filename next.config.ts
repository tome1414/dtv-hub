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
    ]
  },
}

export default nextConfig
