import { setupManifest } from '@start9labs/start-sdk'
import { depLndDescription, long, short } from './i18n'

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
          'sparkielabs/lightning-control-center:0.2.2@sha256:766de7a79820e5adb9fd8c11a03132654ef582bd5f66d1ce6a8d1ea3b369b744',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    lnd: {
      description: depLndDescription,
      optional: false,
      metadata: {
        title: 'LND',
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/f17336a10769efd8782a347662848c50c6270349/icon.svg',
      },
    },
  },
})
