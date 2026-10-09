import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  lccPassword: z.string().catch(''),
  sessionSecret: z.string().catch(''),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes['lcc-data'], subpath: '/store.json' },
  shape,
)
