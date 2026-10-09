import { setLoginPassword } from '../actions/setLoginPassword'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchCredentials = sdk.setupOnInit(async (effects) => {
  if (!(await storeJson.read((s) => s.lccPassword).const(effects))) {
    await sdk.action.createOwnTask(effects, setLoginPassword, 'critical', {
      reason: i18n(
        'Set the login password before signing in to Lightning Control Center',
      ),
    })
  }
})
