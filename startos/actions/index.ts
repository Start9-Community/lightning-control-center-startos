import { sdk } from '../sdk'
import { showLoginPassword } from './showLoginPassword'
import { resetLoginPassword } from './resetLoginPassword'

export const actions = sdk.Actions.of()
  .addAction(showLoginPassword)
  .addAction(resetLoginPassword)
