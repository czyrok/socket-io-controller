import { ClassTransformOptions } from 'class-transformer';
import { Server } from 'socket.io';
/**
 * Registers controllers and actions in the given server framework
 */
export declare class SocketExecutorModel {
    private io;
    /**
     * Indicates if class-transformer package should be used to perform message body serialization / deserialization
     * By default its enabled
     */
    useClassTransformer: boolean;
    /**
     * Global class transformer options passed to class-transformer during classToPlain operation
     * This operation is being executed when server returns response to user
     */
    classToPlainTransformOptions: ClassTransformOptions;
    /**
     * Global class transformer options passed to class-transformer during plainToClass operation
     * This operation is being executed when parsing user parameters
     */
    plainToClassTransformOptions: ClassTransformOptions;
    /**
     * Builder to build arg model with stored arg interface
     */
    private builder;
    constructor(io: Server);
    /**
     * Function to execute the executor, it registers middlewares and controllers
     */
    execute(middlewareClasses?: Array<Function>, controllerClasses?: Array<Function>): void;
    /**
     * Register middlewares and controllers
     */
    private registerAll;
    /**
     * Build a middleware-controller-map per namespace
     */
    private buildNamespaceMap;
    /**
     * Filter controllers from an array of middlewares and controllers
     */
    private recoverControllersFromMap;
    /**
     * Recover middlewares from start to the current key of the map that have a namespace contained in this key
     */
    private recoverMiddlewaresFromMap;
    /**
     * Register middlewares and controllers without namespace
     */
    private registerWithoutNamespace;
    /**
     * Handle connection by controller and by action
     */
    private handleConnection;
    /**
     * Handle connection by type of action
     */
    private handleAction;
    /**
     * Handle parameter entered by the user
     */
    private handleParameter;
    /**
     * Handle parameter format
     */
    private handleParameterFormat;
    /**
     * Parse parameter value
     */
    private parseParameterValue;
    /**
     * Handle the success of the controller function
     */
    private handleSuccessResult;
    /**
     * Handle the fail of the controller function
     */
    private handleFailResult;
    /**
     * Handle parameters of the namespace
     */
    private handleNamespaceParameters;
}
