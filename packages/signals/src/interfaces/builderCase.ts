import {
  AsyncActionStatuses,
  type AsyncActionStatusesType,
  type CreateAsyncActionReturnType
} from '../helpers/types.js'

/**
 * Interface for builder case
 */
export default interface IBuilderCase<T, P = any> {
  case: (
    status: AsyncActionStatusesType,
    handler: (state: T, payload?: P) => T
  ) => IBuilderCase<T, P>

  onPending: (handler: (state: T, payload?: P) => T) => IBuilderCase<T, P>

  onFulfilled: (handler: (state: T, payload?: P) => T) => IBuilderCase<T, P>

  onRejected: (handler: (state: T, payload?: P) => T) => IBuilderCase<T, P>
}

/**
 * Builder case class for managing different cases of the asynchronous task
 * @param _cases List of cases defined for a specific asynchronous task
 */
export class BuilderCase<T, P = any> implements IBuilderCase<T, P> {
  private _cases: Array<Case<T, P>>
  private _asyncAction: CreateAsyncActionReturnType | undefined

  constructor () {
    this._cases = []
    this._asyncAction = undefined
  }

  // Getters

  /**
   * Get the list of cases
   */
  get cases () {
    return this._cases
  }

  /**
   * Get the async action
   */
  get asyncAction () {
    return this._asyncAction
  }

  // Setters

  /**
   * Update the async action
   * @param asyncAction Async Action value
   */
  set asyncAction (asyncAction: CreateAsyncActionReturnType) {
    this._asyncAction = asyncAction
  }

  /**
   * Update the cases
   */
  set cases (cases: Array<Case<T, P>>) {
    this._cases = cases
  }

  /**
   * Method that add a new case into the _cases list and return a new case builder object
   * @param status Status of the asynchronous task
   * @param handler Function that is executed depending on the specific status
   * @returns
   */
  case (
    status: AsyncActionStatusesType,
    handler: (state: T, payload?: P) => T
  ): IBuilderCase<T, P> {
    this._cases.push({
      status,
      handler
    })

    return this
  }

  /**
   * Method that add a pending case into the _cases list and return a new case builder object
   * @param handler Function that is executed depending on the specific status
   * @returns
   */
  onPending (handler: (state: T, payload?: P) => T): IBuilderCase<T, P> {
    return this.case(AsyncActionStatuses.PENDING, handler)
  }

  /**
   * Method that add a fulfilled case into the _cases list and return a new case builder object
   * @param handler Function that is executed depending on the specific status
   * @returns
   */
  onFulfilled (handler: (state: T, payload?: P) => T): IBuilderCase<T, P> {
    return this.case(AsyncActionStatuses.FULFILLED, handler)
  }

  /**
   * Method that add a rejected case into the _cases list and return a new case builder object
   * @param handler Function that is executed depending on the specific status
   * @returns
   **/
  onRejected (handler: (state: T, payload?: P) => T): IBuilderCase<T, P> {
    return this.case(AsyncActionStatuses.REJECTED, handler)
  }
}

/**
 * Case interface
 */
export interface Case<T, P = any> {
  status: AsyncActionStatusesType
  handler: (state: T, payload?: P) => T
}
