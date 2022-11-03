import { ClassTransformOptions } from 'class-transformer'

import { ActionArgModel } from './action.arg.model'

import { ResultArgInterface } from '../../interface/arg/result.arg.interface'

import { ResultTypeEnum } from '../../enum/type/result.type.enum'

/**
 * Concrete object of the associate interface
 */
export class ResultArgModel {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Parameter's action
   */
  private _action!: ActionArgModel

  /**
   * Parameter target
   */
  private _target!: Function

  /**
   * Method on which's parameter is attached
   */
  private _method!: string

  /**
   * Parameter type
   */
  private _type!: ResultTypeEnum

  /**
   * Class transform options used to perform plainToClass operation
   */
  private _classTransformOptions!: ClassTransformOptions

  /**
   * Extra parameter value
   */
   private _value!: string

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  constructor(action: ActionArgModel, args: ResultArgInterface) {
    this.action = action
    this.target = args.target
    this.method = args.method
    this.type = args.type
    
    if (args.classTransformOptions) this.classTransformOptions = args.classTransformOptions
    if (args.value) this.value = args.value
  }

  // -------------------------------------------------------------------------
  // Setters
  // -------------------------------------------------------------------------

  public set action(value: ActionArgModel) {
    this._action = value
  }

  public set target(value: Function) {
    this._target = value
  }

  public set method(value: string) {
    this._method = value
  }

  public set type(value: ResultTypeEnum) {
    this._type = value
  }

  public set classTransformOptions(value: ClassTransformOptions) {
    this._classTransformOptions = value
  }

  public set value(value: string) {
    this._value = value
  }

  // -------------------------------------------------------------------------
  // Getters
  // -------------------------------------------------------------------------

  public get action(): ActionArgModel {
    return this._action
  }

  public get target(): Function {
    return this._target
  }

  public get method(): string {
    return this._method
  }

  public get type(): ResultTypeEnum {
    return this._type
  }

  public get classTransformOptions(): ClassTransformOptions {
    return this._classTransformOptions
  }

  public get value(): string {
    return this._value
  }
}
