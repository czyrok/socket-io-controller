import { Namespace } from 'socket.io'

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

  /**
   * Extra initialization function which it uses at the initialization of the controller
   */
  private _init!: (io: Namespace) => void

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(args: ControllerArgInterface) {
    this.target = args.target

    if (args.namespace) this.namespace = args.namespace
    if (args.init) this.init = args.init
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

  public set init(value: (io: Namespace) => void) {
    this._init = value
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

  public get init(): (io: Namespace) => void {
    return this._init
  }

  public get instance(): any {
    return ContainerHelper.getFromContainer(this.target)
  }
}
