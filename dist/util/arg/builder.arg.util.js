"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderArgUtil = void 0;
const storage_arg_util_1 = require("./storage.arg.util");
const controller_arg_model_1 = require("../../model/arg/controller.arg.model");
const middleware_arg_model_1 = require("../../model/arg/middleware.arg.model");
const action_arg_model_1 = require("../../model/arg/action.arg.model");
const paramater_arg_model_1 = require("../../model/arg/paramater.arg.model");
const result_arg_model_1 = require("../../model/arg/result.arg.model");
/**
 * Builds metadata from the given metadata arguments
 */
class BuilderArgUtil {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Build controllers
     */
    buildControllers(classes) {
        return this.createControllers(classes);
    }
    /**
     * Build middlewares
     */
    buildMiddlewares(classes) {
        return this.createMiddlewares(classes);
    }
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    /**
     * Create controllers
     */
    createControllers(classes) {
        const storage = storage_arg_util_1.StorageArgUtil.defaultStorage;
        const controllers = !classes ? storage.controllers : storage.findControllersForClasses(classes);
        return controllers.map(controllerArgs => {
            const controller = new controller_arg_model_1.ControllerArgModel(controllerArgs);
            controller.actions = this.createActions(controller);
            return controller;
        });
    }
    /**
     * Create middlewares
     */
    createMiddlewares(classes) {
        const storage = storage_arg_util_1.StorageArgUtil.defaultStorage;
        const middlewares = !classes ? storage.middlewares : storage.findMiddlewaresForClasses(classes);
        return middlewares
            //.filter(middlewareArgs => middlewareArgs.namespace === undefined)
            .map(middlewareArgs => {
            return new middleware_arg_model_1.MiddlewareArgModel(middlewareArgs);
        });
    }
    /**
     * Create actions of controller
     */
    createActions(controller) {
        return storage_arg_util_1.StorageArgUtil.defaultStorage
            .findActionsWithTarget(controller.target)
            .map(actionArgs => {
            const action = new action_arg_model_1.ActionArgModel(controller, actionArgs);
            action.params = this.createParameters(action);
            action.results = this.createResults(action);
            return action;
        });
    }
    /**
     * Create parameters of action
     */
    createParameters(action) {
        return storage_arg_util_1.StorageArgUtil.defaultStorage
            .findParametersWithTargetAndMethod(action.target, action.method)
            .map(paramArgs => new paramater_arg_model_1.ParameterArgModel(action, paramArgs));
    }
    /**
     * Create results of action
     */
    createResults(action) {
        return storage_arg_util_1.StorageArgUtil.defaultStorage
            .findResultsWithTargetAndMethod(action.target, action.method)
            .map(resultArgs => new result_arg_model_1.ResultArgModel(action, resultArgs));
    }
}
exports.BuilderArgUtil = BuilderArgUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5hcmcudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL2FyZy9idWlsZGVyLmFyZy51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFtRDtBQUVuRCwrRUFBeUU7QUFDekUsK0VBQXlFO0FBQ3pFLHVFQUFpRTtBQUNqRSw2RUFBdUU7QUFDdkUsdUVBQWlFO0FBRWpFOztHQUVHO0FBQ0gsTUFBYSxjQUFjO0lBQ3pCLDRFQUE0RTtJQUM1RSxpQkFBaUI7SUFDakIsNEVBQTRFO0lBRTVFOztPQUVHO0lBQ0ksZ0JBQWdCLENBQUMsT0FBeUI7UUFDL0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksZ0JBQWdCLENBQUMsT0FBeUI7UUFDL0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxrQkFBa0I7SUFDbEIsNEVBQTRFO0lBRTVFOztPQUVHO0lBQ0ssaUJBQWlCLENBQUMsT0FBeUI7UUFDakQsTUFBTSxPQUFPLEdBQUcsaUNBQWMsQ0FBQyxjQUFjLENBQUE7UUFDN0MsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUUvRixPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUN6RCxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDbkQsT0FBTyxVQUFVLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUIsQ0FBQyxPQUF5QjtRQUNqRCxNQUFNLE9BQU8sR0FBRyxpQ0FBYyxDQUFDLGNBQWMsQ0FBQTtRQUM3QyxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRS9GLE9BQU8sV0FBVztZQUNoQixtRUFBbUU7YUFDbEUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSx5Q0FBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMvQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNLLGFBQWEsQ0FBQyxVQUE4QjtRQUNsRCxPQUFPLGlDQUFjLENBQUMsY0FBYzthQUNqQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2FBQ3hDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLGlDQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ3pELE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMzQyxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0ssZ0JBQWdCLENBQUMsTUFBc0I7UUFDN0MsT0FBTyxpQ0FBYyxDQUFDLGNBQWM7YUFDakMsaUNBQWlDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQy9ELEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksdUNBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVEOztPQUVHO0lBQ0ssYUFBYSxDQUFDLE1BQXNCO1FBQzFDLE9BQU8saUNBQWMsQ0FBQyxjQUFjO2FBQ2pDLDhCQUE4QixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUM1RCxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGlDQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFDOUQsQ0FBQztDQUNGO0FBbEZELHdDQWtGQyJ9