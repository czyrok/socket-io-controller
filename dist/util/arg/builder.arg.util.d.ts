import { ControllerArgModel } from '../../model/arg/controller.arg.model';
import { MiddlewareArgModel } from '../../model/arg/middleware.arg.model';
/**
 * Builds metadata from the given metadata arguments
 */
export declare class BuilderArgUtil {
    /**
     * Build controllers
     */
    buildControllers(classes?: Array<Function>): Array<ControllerArgModel>;
    /**
     * Build middlewares
     */
    buildMiddlewares(classes?: Array<Function>): Array<MiddlewareArgModel>;
    /**
     * Create controllers
     */
    private createControllers;
    /**
     * Create middlewares
     */
    private createMiddlewares;
    /**
     * Create actions of controller
     */
    private createActions;
    /**
     * Create parameters of action
     */
    private createParameters;
    /**
     * Create results of action
     */
    private createResults;
}
