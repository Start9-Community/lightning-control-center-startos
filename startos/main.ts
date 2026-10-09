import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { controlHostId, restPort } from 'lnd-startos/startos/interfaces'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { lndMount, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Lightning Control Center!'))

  const lndRest = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'lnd',
      hostId: controlHostId,
      internalPort: restPort,
    })
    .const()
  if (!lndRest) {
    throw new Error(
      i18n(
        'LND is not yet reachable on the internal network. Ensure LND is installed and running.',
      ),
    )
  }

  const store = await storeJson.read().const(effects)

  return sdk.Daemons.of(effects).addDaemon('lcc', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'lcc' },
      sdk.Mounts.of()
        .mountVolume({
          volumeId: 'lcc-data',
          subpath: null,
          mountpoint: '/data',
          readonly: false,
        })
        .mountDependency<typeof lndManifest>({
          dependencyId: 'lnd',
          volumeId: 'main',
          subpath: null,
          mountpoint: lndMount,
          readonly: true,
        }),
      'lcc',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        LCC_DATA_DIR: '/data',
        LND_REST_HOST: `https://${lndRest}`,
        LND_MACAROON_PATH: `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon`,
        // LND's tls.cert chains to the StartOS root CA that also signs the bridge's cert.
        LND_TLS_CERT_PATH: `${lndMount}/tls.cert`,
        LCC_PASSWORD_MANAGED: '1',
        LCC_PASSWORD: store?.lccPassword ?? '',
        LCC_SESSION_SECRET: store?.sessionSecret ?? '',
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
