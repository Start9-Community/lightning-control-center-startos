import { sdk } from './sdk'
import { depLndDescription } from './manifest/i18n'

const lnd = sdk.Dependency.required('lnd', {
  description: depLndDescription,
  metadata: {
    title: 'LND',
    icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/f17336a10769efd8782a347662848c50c6270349/icon.svg',
  },
  versionRange: '>=0.21.1-beta:4',
  kind: 'running',
  healthChecks: ['lnd', 'sync-progress'],
})

export const dependencies = sdk.Dependencies.of().addDependency(lnd)
