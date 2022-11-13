import { Server } from 'socket.io'

import { SocketExecutorModel } from '../model/socket-executor.model'

import { SettingInterface } from '../interface/setting.interface'

/**
 * Helper to help use this library
 */
export class UsingHelper {
    /**
     * Create an executor to the socket server
     */
    public static createExecutor(io: Server, options: SettingInterface): void {
        const executor = new SocketExecutorModel(io)

        // Import all middlewares
        let middlewareClasses: Array<Function> = new Array()

        if (options && options.middlewares && options.middlewares.length) {
            middlewareClasses = (options.middlewares as any[]).filter(middleware => middleware instanceof Function)
        }

        // Import all controllers
        let controllerClasses: Array<Function> = new Array()

        if (options && options.controllers && options.controllers.length) {
            controllerClasses = (options.controllers as any[]).filter(controller => controller instanceof Function)
        }

        if (options.useClassTransformer !== undefined) {
            executor.useClassTransformer = options.useClassTransformer
        } else {
            executor.useClassTransformer = true
        }

        executor.classToPlainTransformOptions = options.classToPlainTransformOptions || {}
        executor.plainToClassTransformOptions = options.plainToClassTransformOptions || {}

        // Run socket controller register and other operations
        executor.execute(middlewareClasses, controllerClasses)
    }
}