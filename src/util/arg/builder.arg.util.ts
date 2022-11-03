import { StorageArgUtil } from './storage.arg.util'

import { ControllerArgModel } from '../../model/arg/controller.arg.model'
import { MiddlewareArgModel } from '../../model/arg/middleware.arg.model'
import { ActionArgModel } from '../../model/arg/action.arg.model'
import { ParameterArgModel } from '../../model/arg/paramater.arg.model'
import { ResultArgModel } from '../../model/arg/result.arg.model'

/**
 * Builds metadata from the given metadata arguments
 */
export class BuilderArgUtil {
  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Build controllers
   */
  public buildControllers(classes?: Array<Function>): Array<ControllerArgModel> {
    return this.createControllers(classes)
  }

  /**
   * Build middlewares
   */
  public buildMiddlewares(classes?: Array<Function>): Array<MiddlewareArgModel> {
    return this.createMiddlewares(classes)
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  /**
   * Create controllers
   */
  private createControllers(classes?: Array<Function>): Array<ControllerArgModel> {
    const storage = StorageArgUtil.defaultStorage
    const controllers = !classes ? storage.controllers : storage.findControllersForClasses(classes)

    return controllers.map(controllerArgs => {
      const controller = new ControllerArgModel(controllerArgs)
      controller.actions = this.createActions(controller)
      return controller
    })
  }

  /**
   * Create middlewares
   */
  private createMiddlewares(classes?: Array<Function>): Array<MiddlewareArgModel> {
    const storage = StorageArgUtil.defaultStorage
    const middlewares = !classes ? storage.middlewares : storage.findMiddlewaresForClasses(classes)

    return middlewares
      //.filter(middlewareArgs => middlewareArgs.namespace === undefined)
      .map(middlewareArgs => {
        return new MiddlewareArgModel(middlewareArgs)
      })
  }

  /**
   * Create actions of controller
   */
  private createActions(controller: ControllerArgModel): Array<ActionArgModel> {
    return StorageArgUtil.defaultStorage
      .findActionsWithTarget(controller.target)
      .map(actionArgs => {
        const action = new ActionArgModel(controller, actionArgs)
        action.params = this.createParameters(action)
        action.results = this.createResults(action)
        return action
      })
  }

  /**
   * Create parameters of action
   */
  private createParameters(action: ActionArgModel): Array<ParameterArgModel> {
    return StorageArgUtil.defaultStorage
      .findParametersWithTargetAndMethod(action.target, action.method)
      .map(paramArgs => new ParameterArgModel(action, paramArgs))
  }

  /**
   * Create results of action
   */
  private createResults(action: ActionArgModel): Array<ResultArgModel> {
    return StorageArgUtil.defaultStorage
      .findResultsWithTargetAndMethod(action.target, action.method)
      .map(resultArgs => new ResultArgModel(action, resultArgs))
  }
}
