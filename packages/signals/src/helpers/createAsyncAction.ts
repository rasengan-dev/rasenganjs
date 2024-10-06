import {
  AsyncActionStatuses,
  type CreateAsyncActionProp,
  type CreateAsyncActionReturnType
} from './types.js'

/**
 * This function create an async action with different statuses
 * @param handler Function that perform asynchronous task
 * @returns
 */
const createAsyncAction = (
  handler: CreateAsyncActionProp
): CreateAsyncActionReturnType => {
  return {
    pending: AsyncActionStatuses.PENDING,
    fulfilled: AsyncActionStatuses.FULFILLED,
    rejected: AsyncActionStatuses.REJECTED,
    handler
  }
}

export default createAsyncAction
