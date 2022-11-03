import { ContainerHelper } from '../../helper/container.helper'

import { ActionArgModel } from './action.arg.model'

import { ControllerArgInterface } from '../../interface/arg/controller.arg.interface'

/**
 * Concrete object of the associate interface
 */
export class ControllerArgModel {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Controller actions
   */
  private _actions: Array<ActionArgModel> = []

  /**
   * Indicates object which is used by this controller
   */
  private _target!: Function

  /**
   * Base route for all actions registered in this controller
   */
  private _namespace!: string

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(args: ControllerArgInterface) {
    this.target = args.target
    
    if (args.namespace) this.namespace = args.namespace
  }

  // -------------------------------------------------------------------------
  // Setters
  // -------------------------------------------------------------------------

  public set actions(value: Array<ActionArgModel>) {
    this._actions = value
  }

  public set target(value: Function) {
    this._target = value
  }

  public set namespace(value: string) {
    this._namespace = value
  }

  // -------------------------------------------------------------------------
  // Getters
  // -------------------------------------------------------------------------

  public get actions(): Array<ActionArgModel> {
    return this._actions
  }

  public get target(): Function {
    return this._target
  }

  public get namespace(): string {
    return this._namespace
  }

  public get instance(): any {
    return ContainerHelper.getFromContainer(this.target)
  }
}
