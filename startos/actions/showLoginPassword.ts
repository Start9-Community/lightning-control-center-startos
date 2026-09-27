import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'

export const showLoginPassword = sdk.Action.withoutInput(
  'show-login-password',
  async ({ effects }) => ({
    name: i18n('Show Login Password'),
    description: i18n('Display the password for signing in to Lightning Control Center'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async ({ effects }) => ({
    version: '1',
    title: i18n('Login Password'),
    message: i18n('Use this password to sign in to Lightning Control Center.'),
    result: {
      type: 'single',
      value: (await storeJson.read((s) => s.lccPassword).once()) ?? '',
      copyable: true,
      qr: false,
      masked: true,
    },
  }),
)
