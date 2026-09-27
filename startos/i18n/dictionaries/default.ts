export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Lightning Control Center!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'The Lightning Control Center dashboard': 4,

  // actions
  'Show Login Password': 5,
  'Display the password for signing in to Lightning Control Center': 6,
  'Login Password': 7,
  'Use this password to sign in to Lightning Control Center.': 8,
  'Reset Login Password': 9,
  'Generate a new random password and sign out all existing sessions': 10,
  'The current password stops working immediately and everyone is signed out.': 11,
  'New Login Password': 12,
  'Lightning Control Center is restarting with this password. Use it to sign in once it is back up.': 13,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
