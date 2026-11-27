import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'lightning-control-center',
  title: 'Lightning Control Center',
  license: 'MIT',
  packageRepo:
    'https://github.com/Start9-Community/lightning-control-center-startos',
  upstreamRepo: 'https://github.com/lioranecho-cpu/lightning-control-center',
  marketingUrl: 'https://satslist.shop',
  donationUrl: null,
  description: { short, long },
  volumes: ['lcc-data'],
  images: {
    lcc: {
      source: {
        dockerTag:
          'sparkielabs/lightning-control-center:0.2.3@sha256:f7f435dfb744824650dbc744389c589f7953b8b4fbbc8524753549bb79a4f198',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
