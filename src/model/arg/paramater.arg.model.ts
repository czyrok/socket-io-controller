import { ClassTransformOptions } from 'class-transformer'
import { Socket } from 'socket.io'

import { ActionArgModel } from './action.arg.model'

import { ParameterArgInterface } from '../../interface/arg/parameter.arg.interface'

import { ParameterTypeEnum } from '../../enum/type/parameter.type.enum'

/**
 * Concrete object of the associate interface
 */
export class ParameterArgModel {
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
   * Index (# number) of the parameter in the method signature
   */
  private _index!: number

  /**
   * Parameter type
   */
  private _type!: ParameterTypeEnum

  /**
   * Extra parameter value
   */
  private _value!: string

  /**
   * Reflected type of the parameter
   */
  private _reflectedType: any

  /**
   * Transforms the value
   */
  private _transform!: ((value: any, socket: Socket) => Promise<any> | any)

  /**
   * Class transform options used to perform plainToClass operation
   */
  private _classTransformOptions!: ClassTransformOptions

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  constructor(action: ActionArgModel, args: ParameterArgInterface) {
    this.action = action
    this.target = args.target
    this.method = args.method
    this.reflectedType = args.reflectedType
    this.index = args.index
    this.type = args.type

    if (args.transform) this.transform = args.transform
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

  public set index(value: number) {
    this._index = value
  }

  public set type(value: ParameterTypeEnum) {
    this._type = value
  }

  public set value(value: string) {
    this._value = value
  }

  public set reflectedType(value: any) {
    this._reflectedType = value
  }

  public set transform(value: (value: any, socket: Socket) => Promise<any> | any) {
    this._transform = value
  }

  public set classTransformOptions(value: ClassTransformOptions) {
    this._classTransformOptions = value
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

  public get index(): number {
    return this._index
  }

  public get type(): ParameterTypeEnum {
    return this._type
  }

  public get value(): string {
    return this._value
  }

  public get reflectedType(): any {
    return this._reflectedType
  }

  public get transform(): (value: any, socket: Socket) => Promise<any> | any {
    return this._transform
  }

  public get classTransformOptions(): ClassTransformOptions {
    return this._classTransformOptions
  }
}
