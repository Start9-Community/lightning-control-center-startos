import { sdk } from '../sdk'
import { newSecret, storeJson } from '../fileModels/store.json'

// Runs on install, update, restore and every boot. Fills in any credential
// that is missing and never replaces one that exists, so installs upgrading
// from a version without store.json get credentials too.
export const seedCredentials = sdk.setupOnInit(async (effects) => {
  const current = await storeJson.read().once()
  const patch: { lccPassword?: string; sessionSecret?: string } = {}
  if (!current?.lccPassword) patch.lccPassword = newSecret(24)
  if (!current?.sessionSecret) patch.sessionSecret = newSecret(48)
  if (Object.keys(patch).length > 0) await storeJson.merge(effects, patch)
})
