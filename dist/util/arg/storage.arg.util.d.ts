import { ControllerArgInterface } from '../../interface/arg/controller.arg.interface';
import { MiddlewareArgInterface } from '../../interface/arg/middleware.arg.interface';
import { ActionArgInterface } from '../../interface/arg/action.arg.interface';
import { ResultArgInterface } from '../../interface/arg/result.arg.interface';
import { ParameterArgInterface } from '../../interface/arg/parameter.arg.interface';
/**
 * Storage all metadatas read from decorators
 */
export declare class StorageArgUtil {
    /**
     * Saved controllers
     */
    private _controllers;
    /**
     * Saved middlewares
     */
    private _middlewares;
    /**
     * Saved actions
     */
    private _actions;
    /**
     * Saved results
     */
    private _results;
    /**
     * Saved parameters
     */
    private _parameters;
    /**
     * Find controllers for classes
     */
    findControllersForClasses(classes: Array<Function>): Array<ControllerArgInterface>;
    /**
     * Find middlewares for classes
     */
    findMiddlewaresForClasses(classes: Array<Function>): Array<MiddlewareArgInterface>;
    /**
     * Find actions with target
     */
    findActionsWithTarget(target: Function): Array<ActionArgInterface>;
    /**
     * Find results with target and method name
     */
    findResultsWithTargetAndMethod(target: Function, methodName: string): Array<ResultArgInterface>;
    /**
     * Find parameters with target and method name
     */
    findParametersWithTargetAndMethod(target: Function, methodName: string): Array<ParameterArgInterface>;
    /**
     * Removes all saved metadata
     */
    reset(): void;
    set controllers(value: Array<ControllerArgInterface>);
    set middlewares(value: Array<MiddlewareArgInterface>);
    set actions(value: Array<ActionArgInterface>);
    set results(value: Array<ResultArgInterface>);
    set parameters(value: Array<ParameterArgInterface>);
    get controllers(): Array<ControllerArgInterface>;
    get middlewares(): Array<MiddlewareArgInterface>;
    get actions(): Array<ActionArgInterface>;
    get results(): Array<ResultArgInterface>;
    get parameters(): Array<ParameterArgInterface>;
    static get defaultStorage(): StorageArgUtil;
}
