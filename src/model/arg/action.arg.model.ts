import { ParameterArgModel } from './paramater.arg.model'
import { ControllerArgModel } from './controller.arg.model'
import { ResultArgModel } from './result.arg.model'

import { ActionArgInterface } from '../../interface/arg/action.arg.interface'

import { ActionTypeEnum } from '../../enum/type/action.type.enum'
import { ResultTypeEnum } from '../../enum/type/result.type.enum'

/**
 * Concrete object of the associate interface
 */
export class ActionArgModel {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Action's controller
   */
  private _controller!: ControllerArgModel

  /**
   * Action's parameters
   */
  private _params: Array<ParameterArgModel> = []

  /**
   * Action's result handlers
   */
  private _results: Array<ResultArgModel> = []

  /**
   * Message name served by this action
   */
  private _name!: string

  /**
   * Class on which's method this action is attached
   */
  private _target!: Function

  /**
   * Object's method that will be executed on this action
   */
  private _method!: string

  /**
   * Action type represents http method used for the registered route
   * Can be one of the value defined in ActionTypeEnum
   */
  private _type!: ActionTypeEnum

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  constructor(controllerMetadata: ControllerArgModel, args: ActionArgInterface) {
    this.controller = controllerMetadata
    
    if (args.name) this.name = args.name

    this.target = args.target
    this.method = args.method
    this.type = args.type
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  public executeAction(params: Array<any>): any {
    return this.controller.instance[this.method].apply(this.controller.instance, params)
  }

  // -------------------------------------------------------------------------
  // Setters
  // -------------------------------------------------------------------------

  public set controller(value: ControllerArgModel) {
    this._controller = value
  }

  public set params(value: Array<ParameterArgModel>) {
    this._params = value
  }

  public set results(value: Array<ResultArgModel>) {
    this._results = value
  }

  public set name(value: string) {
    this._name = value
  }

  public set target(value: Function) {
    this._target = value
  }

  public set method(value: string) {
    this._method = value
  }

  public set type(value: ActionTypeEnum) {
    this._type = value
  }

  // -------------------------------------------------------------------------
  // Getters
  // -------------------------------------------------------------------------

  public get controller(): ControllerArgModel {
    return this._controller
  }

  public get params(): Array<ParameterArgModel> {
    return this._params
  }

  public get results(): Array<ResultArgModel> {
    return this._results
  }

  public get name(): string {
    return this._name
  }

  public get target(): Function {
    return this._target
  }

  public get method(): string {
    return this._method
  }

  public get type(): ActionTypeEnum {
    return this._type
  }

  public get emitNamespaceBroadcastOnSuccess(): ResultArgModel | undefined {
    return this.results.find(resultHandler => resultHandler.type === ResultTypeEnum.EMIT_NAMESPACE_BROADCAST_ON_SUCCESS)
  }

  public get emitOnSuccess(): ResultArgModel | undefined {
    return this.results.find(resultHandler => resultHandler.type === ResultTypeEnum.EMIT_ON_SUCCESS)
  }

  public get emitOnFail(): ResultArgModel | undefined {
    return this.results.find(resultHandler => resultHandler.type === ResultTypeEnum.EMIT_ON_FAIL)
  }

  public get skipEmitOnEmptyResult(): ResultArgModel | undefined {
    return this.results.find(resultHandler => resultHandler.type === ResultTypeEnum.SKIP_EMIT_ON_EMPTY_RESULT)
  }
}
