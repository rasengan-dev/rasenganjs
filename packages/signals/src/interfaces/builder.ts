import { type CreateAsyncActionReturnType } from "../helpers/types.js";
import type IBuilderCase from "./builderCase.js";
import { BuilderCase } from "./builderCase.js";

export default interface IBuilder<T, P = any> {
  use: (asyncAction: CreateAsyncActionReturnType) => IBuilderCase<T, P>;
}

/**
 * @class Builder
 * @implements IBuilder
 * @description
 * Builder class to initialize a new builder case instance and return it in order to
 * chain the builder case methods, or onPending, onFulfilled, onRejected methods to define
 * the async action steps.
 */
export class Builder<T, P = any> implements IBuilder<T, P> {
  /**
   * This method takes an async action object and assign it to the builder case instance
   * @param asyncAction An async action object
   * @returns IBuilderCase
   */
  use(asyncAction: CreateAsyncActionReturnType): IBuilderCase<T, P> {
    const builderCase = new BuilderCase<T, P>();

    builderCase.asyncAction = asyncAction;
    builderCase.cases = [];

    return builderCase;
  }
}
