import { ActionArgModel } from './action.arg.model';
import { ControllerArgInterface } from '../../interface/arg/controller.arg.interface';
/**
 * Concrete object of the associate interface
 */
export declare class ControllerArgModel {
    /**
     * Controller actions
     */
    private _actions;
    /**
     * Indicates object which is used by this controller
     */
    private _target;
    /**
     * Base route for all actions registered in this controller
     */
    private _namespace;
    constructor(args: ControllerArgInterface);
    set actions(value: Array<ActionArgModel>);
    set target(value: Function);
    set namespace(value: string);
    get actions(): Array<ActionArgModel>;
    get target(): Function;
    get namespace(): string;
    get instance(): any;
}
