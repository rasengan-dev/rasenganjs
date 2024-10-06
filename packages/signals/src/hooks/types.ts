import { type AsyncActionStatusesType } from '../helpers/types.js'

export type Actions = Record<string, (payload?: any) => void>

export type AsyncActions<T> = Record<string, (payload?: any) => Promise<{
  state: T,
  data: any | null,
  error: Error | null,
  status: AsyncActionStatusesType
}>>

export type Operations<P = any> = Record<string, (payload?: any) => P>
