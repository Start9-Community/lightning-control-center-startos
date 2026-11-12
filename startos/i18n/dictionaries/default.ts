export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Lightning Control Center!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'LND is not yet reachable on the internal network. Ensure LND is installed and running.': 4,

  // interfaces.ts
  'The Lightning Control Center dashboard': 5,

  // actions/setLoginPassword.ts
  'Set Login Password': 6,
  'Generate a new random password for signing in to Lightning Control Center. Replaces any existing password and signs out every session.': 7,
  'Replaces the current login password and signs out every session.': 8,
  'Login Password': 9,
  'Use this password to sign in to Lightning Control Center. If it is running, it restarts to apply it.': 10,

  // init/watchCredentials.ts
  'Set the login password before signing in to Lightning Control Center': 11,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
