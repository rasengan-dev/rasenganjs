import { type Actions } from './types.js'
import useActions from './useActions.js'

const useAction = <T = Actions>(signalName: string, action: string) => {
  if (!signalName || typeof signalName !== 'string') { throw new Error('Provide a signalName as a first argument of useAction') }

  if (!action || typeof action !== 'string') { throw new Error('Provide an action as second argument of useAction') }

  const actions = useActions<T>(signalName, action)

  return Object.values(actions)[0]
}

export default useAction
