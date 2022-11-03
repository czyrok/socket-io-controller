import { ClassTransformOptions } from 'class-transformer';
import { Socket } from 'socket.io';
import { ActionArgModel } from './action.arg.model';
import { ParameterArgInterface } from '../../interface/arg/parameter.arg.interface';
import { ParameterTypeEnum } from '../../enum/type/parameter.type.enum';
/**
 * Concrete object of the associate interface
 */
export declare class ParameterArgModel {
    /**
     * Parameter's action
     */
    private _action;
    /**
     * Parameter target
     */
    private _target;
    /**
     * Method on which's parameter is attached
     */
    private _method;
    /**
     * Index (# number) of the parameter in the method signature
     */
    private _index;
    /**
     * Parameter type
     */
    private _type;
    /**
     * Extra parameter value
     */
    private _value;
    /**
     * Reflected type of the parameter
     */
    private _reflectedType;
    /**
     * Transforms the value
     */
    private _transform;
    /**
     * Class transform options used to perform plainToClass operation
     */
    private _classTransformOptions;
    constructor(action: ActionArgModel, args: ParameterArgInterface);
    set action(value: ActionArgModel);
    set target(value: Function);
    set method(value: string);
    set index(value: number);
    set type(value: ParameterTypeEnum);
    set value(value: string);
    set reflectedType(value: any);
    set transform(value: (value: any, socket: Socket) => Promise<any> | any);
    set classTransformOptions(value: ClassTransformOptions);
    get action(): ActionArgModel;
    get target(): Function;
    get method(): string;
    get index(): number;
    get type(): ParameterTypeEnum;
    get value(): string;
    get reflectedType(): any;
    get transform(): (value: any, socket: Socket) => Promise<any> | any;
    get classTransformOptions(): ClassTransformOptions;
}
