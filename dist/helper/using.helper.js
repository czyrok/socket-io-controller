"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsingHelper = void 0;
const directory_exported_classes_loader_helper_1 = require("./directory-exported-classes-loader.helper");
const socket_executor_model_1 = require("../model/socket-executor.model");
/**
 * Helper to load use this library
 */
class UsingHelper {
    /**
     * Create an executor to the socket server and return them
     */
    static useSocketServer(io, options) {
        this.createExecutor(io, options || {});
        return io;
    }
    /**
     * Create an executor to the socket server
     */
    static createExecutor(io, options) {
        const executor = new socket_executor_model_1.SocketExecutorModel(io);
        // Import all middlewares
        let middlewareClasses = new Array();
        if (options && options.middlewares && options.middlewares.length) {
            middlewareClasses = options.middlewares.filter(middleware => middleware instanceof Function);
        }
        const middlewareDirs = options.middlewares.filter(middleware => typeof middleware === 'string');
        middlewareClasses.push(...directory_exported_classes_loader_helper_1.DirectoryExportedClassesLoaderHelper.importClassesFromDirectories(middlewareDirs));
        // Import all controllers
        let controllerClasses = new Array();
        if (options && options.controllers && options.controllers.length) {
            controllerClasses = options.controllers.filter(controller => controller instanceof Function);
        }
        const controllerDirs = options.controllers.filter(controller => typeof controller === 'string');
        controllerClasses.push(...directory_exported_classes_loader_helper_1.DirectoryExportedClassesLoaderHelper.importClassesFromDirectories(controllerDirs));
        if (options.useClassTransformer !== undefined) {
            executor.useClassTransformer = options.useClassTransformer;
        }
        else {
            executor.useClassTransformer = true;
        }
        executor.classToPlainTransformOptions = options.classToPlainTransformOptions || {};
        executor.plainToClassTransformOptions = options.plainToClassTransformOptions || {};
        // Run socket controller register and other operations
        executor.execute(middlewareClasses, controllerClasses);
    }
}
exports.UsingHelper = UsingHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNpbmcuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlci91c2luZy5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEseUdBQWlHO0FBRWpHLDBFQUFvRTtBQUlwRTs7R0FFRztBQUNILE1BQWEsV0FBVztJQUNwQjs7T0FFRztJQUNJLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBVSxFQUFFLE9BQTBCO1FBQ2hFLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUV0QyxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNLLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBVSxFQUFFLE9BQXlCO1FBQy9ELE1BQU0sUUFBUSxHQUFHLElBQUksMkNBQW1CLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFNUMseUJBQXlCO1FBQ3pCLElBQUksaUJBQWlCLEdBQW9CLElBQUksS0FBSyxFQUFFLENBQUE7UUFFcEQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUM5RCxpQkFBaUIsR0FBSSxPQUFPLENBQUMsV0FBcUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLFlBQVksUUFBUSxDQUFDLENBQUE7U0FDMUc7UUFFRCxNQUFNLGNBQWMsR0FBSSxPQUFPLENBQUMsV0FBcUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQTtRQUMxRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRywrRUFBb0MsQ0FBQyw0QkFBNEIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO1FBRTVHLHlCQUF5QjtRQUN6QixJQUFJLGlCQUFpQixHQUFvQixJQUFJLEtBQUssRUFBRSxDQUFBO1FBRXBELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDOUQsaUJBQWlCLEdBQUksT0FBTyxDQUFDLFdBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxZQUFZLFFBQVEsQ0FBQyxDQUFBO1NBQzFHO1FBRUQsTUFBTSxjQUFjLEdBQUksT0FBTyxDQUFDLFdBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUE7UUFDMUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsK0VBQW9DLENBQUMsNEJBQTRCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUU1RyxJQUFJLE9BQU8sQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7WUFDM0MsUUFBUSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQTtTQUM3RDthQUFNO1lBQ0gsUUFBUSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQTtTQUN0QztRQUVELFFBQVEsQ0FBQyw0QkFBNEIsR0FBRyxPQUFPLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFBO1FBQ2xGLFFBQVEsQ0FBQyw0QkFBNEIsR0FBRyxPQUFPLENBQUMsNEJBQTRCLElBQUksRUFBRSxDQUFBO1FBRWxGLHNEQUFzRDtRQUN0RCxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFDMUQsQ0FBQztDQUNKO0FBaERELGtDQWdEQyJ9