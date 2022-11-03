import { MiddlewareArgInterface } from '../../interface/arg/middleware.arg.interface';
/**
 * Concrete object of the associate interface
 */
export declare class MiddlewareArgModel {
    /**
     * Indicates object which is used by this middleware
     */
    private _target;
    /**
     * Base route for all actions registered in this middleware
     */
    private _namespace;
    /**
     * Priority used by this middleware
     */
    private _priority;
    constructor(args: MiddlewareArgInterface);
    set target(value: Function);
    set namespace(value: string);
    set priority(value: number);
    get target(): Function;
    get namespace(): string;
    get priority(): number;
    get instance(): any;
}
