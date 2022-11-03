import { ControllerArgInterface } from '../../interface/arg/controller.arg.interface'
import { MiddlewareArgInterface } from '../../interface/arg/middleware.arg.interface'

import { ActionArgInterface } from '../../interface/arg/action.arg.interface'
import { ResultArgInterface } from '../../interface/arg/result.arg.interface'
import { ParameterArgInterface } from '../../interface/arg/parameter.arg.interface'

/**
 * Storage all metadatas read from decorators
 */
export class StorageArgUtil {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Saved controllers
   */
  private _controllers: Array<ControllerArgInterface> = []

  /**
   * Saved middlewares
   */
  private _middlewares: Array<MiddlewareArgInterface> = []

  /**
   * Saved actions
   */
  private _actions: Array<ActionArgInterface> = []

  /**
   * Saved results
   */
  private _results: Array<ResultArgInterface> = []

  /**
   * Saved parameters
   */
  private _parameters: Array<ParameterArgInterface> = []

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Find controllers for classes
   */
  public findControllersForClasses(classes: Array<Function>): Array<ControllerArgInterface> {
    return this.controllers.filter(ctrl => {
      return classes.filter(cls => ctrl.target === cls).length > 0
    })
  }

  /**
   * Find middlewares for classes
   */
  public findMiddlewaresForClasses(classes: Array<Function>): Array<MiddlewareArgInterface> {
    return this.middlewares.filter(middleware => {
      return classes.filter(cls => middleware.target === cls).length > 0
    })
  }

  /**
   * Find actions with target
   */
  public findActionsWithTarget(target: Function): Array<ActionArgInterface> {
    return this.actions.filter(action => action.target === target)
  }

  /**
   * Find results with target and method name
   */
  public findResultsWithTargetAndMethod(target: Function, methodName: string): Array<ResultArgInterface> {
    return this.results.filter(result => {
      return result.target === target && result.method === methodName
    })
  }

  /**
   * Find parameters with target and method name
   */
  public findParametersWithTargetAndMethod(target: Function, methodName: string): Array<ParameterArgInterface> {
    return this.parameters.filter(parameter => {
      return parameter.target === target && parameter.method === methodName
    })
  }

  /**
   * Removes all saved metadata
   */
  public reset(): void {
    this.controllers = []
    this.middlewares = []
    this.actions = []
    this.results = []
    this.parameters = []
  }

  // -------------------------------------------------------------------------
  // Setters
  // -------------------------------------------------------------------------

  public set controllers(value: Array<ControllerArgInterface>) {
    this._controllers = value
  }

  public set middlewares(value: Array<MiddlewareArgInterface>) {
    this._middlewares = value
  }

  public set actions(value: Array<ActionArgInterface>) {
    this._actions = value
  }

  public set results(value: Array<ResultArgInterface>) {
    this._results = value
  }

  public set parameters(value: Array<ParameterArgInterface>) {
    this._parameters = value
  }

  // -------------------------------------------------------------------------
  // Getters
  // -------------------------------------------------------------------------

  public get controllers(): Array<ControllerArgInterface> {
    return this._controllers
  }

  public get middlewares(): Array<MiddlewareArgInterface> {
    return this._middlewares
  }

  public get actions(): Array<ActionArgInterface> {
    return this._actions
  }

  public get results(): Array<ResultArgInterface> {
    return this._results
  }

  public get parameters(): Array<ParameterArgInterface> {
    return this._parameters
  }

  public static get defaultStorage(): StorageArgUtil {
    if (!(global as any).socketControllersMetadataArgsStorage)
      (global as any).socketControllersMetadataArgsStorage = new StorageArgUtil()

    return (global as any).socketControllersMetadataArgsStorage
  }
}
