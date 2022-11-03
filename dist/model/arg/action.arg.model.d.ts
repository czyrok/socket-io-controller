import { ParameterArgModel } from './paramater.arg.model';
import { ControllerArgModel } from './controller.arg.model';
import { ResultArgModel } from './result.arg.model';
import { ActionArgInterface } from '../../interface/arg/action.arg.interface';
import { ActionTypeEnum } from '../../enum/type/action.type.enum';
/**
 * Concrete object of the associate interface
 */
export declare class ActionArgModel {
    /**
     * Action's controller
     */
    private _controller;
    /**
     * Action's parameters
     */
    private _params;
    /**
     * Action's result handlers
     */
    private _results;
    /**
     * Message name served by this action
     */
    private _name;
    /**
     * Class on which's method this action is attached
     */
    private _target;
    /**
     * Object's method that will be executed on this action
     */
    private _method;
    /**
     * Action type represents http method used for the registered route
     * Can be one of the value defined in ActionTypeEnum
     */
    private _type;
    constructor(controllerMetadata: ControllerArgModel, args: ActionArgInterface);
    executeAction(params: Array<any>): any;
    set controller(value: ControllerArgModel);
    set params(value: Array<ParameterArgModel>);
    set results(value: Array<ResultArgModel>);
    set name(value: string);
    set target(value: Function);
    set method(value: string);
    set type(value: ActionTypeEnum);
    get controller(): ControllerArgModel;
    get params(): Array<ParameterArgModel>;
    get results(): Array<ResultArgModel>;
    get name(): string;
    get target(): Function;
    get method(): string;
    get type(): ActionTypeEnum;
    get emitNamespaceBroadcastOnSuccess(): ResultArgModel | undefined;
    get emitOnSuccess(): ResultArgModel | undefined;
    get emitOnFail(): ResultArgModel | undefined;
    get skipEmitOnEmptyResult(): ResultArgModel | undefined;
}
