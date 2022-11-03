import { ContainerHelper } from '../../helper/container.helper'

import { MiddlewareArgInterface } from '../../interface/arg/middleware.arg.interface'

/**
 * Concrete object of the associate interface
 */
export class MiddlewareArgModel {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Indicates object which is used by this middleware
   */
  private _target!: Function

  /**
   * Base route for all actions registered in this middleware
   */
  private _namespace!: string

  /**
   * Priority used by this middleware
   */
  private _priority!: number

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(args: MiddlewareArgInterface) {
    this.target = args.target

    if (args.namespace) this.namespace = args.namespace
    
    this.priority = args.priority || 0
  }

  // -------------------------------------------------------------------------
  // Setters
  // -------------------------------------------------------------------------

  public set target(value: Function) {
    this._target = value
  }

  public set namespace(value: string) {
    this._namespace = value
  }

  public set priority(value: number) {
    this._priority = value
  }

  // -------------------------------------------------------------------------
  // Getters
  // -------------------------------------------------------------------------

  public get target(): Function {
    return this._target
  }

  public get namespace(): string {
    return this._namespace
  }

  public get priority(): number {
    return this._priority
  }

  public get instance(): any {
    return ContainerHelper.getFromContainer(this.target)
  }
}
