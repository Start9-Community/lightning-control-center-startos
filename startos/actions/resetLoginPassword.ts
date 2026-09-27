import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { newSecret, storeJson } from '../fileModels/store.json'

export const resetLoginPassword = sdk.Action.withoutInput(
  'reset-login-password',
  async ({ effects }) => ({
    name: i18n('Reset Login Password'),
    description: i18n('Generate a new random password and sign out all existing sessions'),
    warning: i18n('The current password stops working immediately and everyone is signed out.'),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async ({ effects }) => {
    const lccPassword = newSecret(24)
    // Rotating the session secret too invalidates every existing login.
    await storeJson.merge(effects, { lccPassword, sessionSecret: newSecret(48) })
    return {
      version: '1',
      title: i18n('New Login Password'),
      message: i18n('Lightning Control Center is restarting with this password. Use it to sign in once it is back up.'),
      result: {
        type: 'single',
        value: lccPassword,
        copyable: true,
        qr: false,
        masked: true,
      },
    }
  },
)
