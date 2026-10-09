import { sdk } from '../sdk'
import { dataJson } from '../fileModels/data.json'
import { storeJson } from '../fileModels/store.json'
import { newSecret } from '../utils'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await dataJson.merge(effects, {})
  if (!(await storeJson.read((s) => s.sessionSecret).once())) {
    await storeJson.merge(effects, { sessionSecret: newSecret(48) })
  }
})
