import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// LCC's own settings file; it reads it on every request but never creates it.
export const dataJson = FileHelper.json(
  { base: sdk.volumes['lcc-data'], subpath: '/data.json' },
  z.looseObject({}),
)
