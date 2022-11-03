import { ClassTransformOptions } from 'class-transformer';
import { ActionArgModel } from './action.arg.model';
import { ResultArgInterface } from '../../interface/arg/result.arg.interface';
import { ResultTypeEnum } from '../../enum/type/result.type.enum';
/**
 * Concrete object of the associate interface
 */
export declare class ResultArgModel {
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
     * Parameter type
     */
    private _type;
    /**
     * Class transform options used to perform plainToClass operation
     */
    private _classTransformOptions;
    /**
     * Extra parameter value
     */
    private _value;
    constructor(action: ActionArgModel, args: ResultArgInterface);
    set action(value: ActionArgModel);
    set target(value: Function);
    set method(value: string);
    set type(value: ResultTypeEnum);
    set classTransformOptions(value: ClassTransformOptions);
    set value(value: string);
    get action(): ActionArgModel;
    get target(): Function;
    get method(): string;
    get type(): ResultTypeEnum;
    get classTransformOptions(): ClassTransformOptions;
    get value(): string;
}
