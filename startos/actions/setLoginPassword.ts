import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { newSecret } from '../utils'

export const setLoginPassword = sdk.Action.withoutInput(
  'set-login-password',
  async ({ effects }) => ({
    name: i18n('Set Login Password'),
    description: i18n(
      'Generate a new random password for signing in to Lightning Control Center. Replaces any existing password and signs out every session.',
    ),
    warning: (await storeJson.read((s) => s.lccPassword).const(effects))
      ? i18n('Replaces the current login password and signs out every session.')
      : null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async ({ effects }) => {
    const lccPassword = newSecret(24)
    await storeJson.merge(effects, {
      lccPassword,
      sessionSecret: newSecret(48),
    })
    return {
      version: '1',
      title: i18n('Login Password'),
      message: i18n(
        'Use this password to sign in to Lightning Control Center. If it is running, it restarts to apply it.',
      ),
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
