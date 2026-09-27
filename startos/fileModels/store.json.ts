import { FileHelper, utils, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// Credentials LCC needs but cannot create for itself in a container: the
// login password and the key that signs session cookies. Kept on the
// persistent lcc-data volume, so they survive upgrades and are backed up.
const shape = z.object({
  lccPassword: z.string().catch(''),
  sessionSecret: z.string().catch(''),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes['lcc-data'], subpath: '/store.json' },
  shape,
)

export const newSecret = (len: number) =>
  utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len })
