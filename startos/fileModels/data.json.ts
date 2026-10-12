import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const dataJson = FileHelper.json(
  { base: sdk.volumes['lcc-data'], subpath: '/data.json' },
  z.looseObject({}),
)
