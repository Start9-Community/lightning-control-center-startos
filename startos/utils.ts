import { utils } from '@start9labs/start-sdk'

export const uiPort = 8765

export const lndMount = '/mnt/lnd'

export const newSecret = (len: number) =>
  utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len })
