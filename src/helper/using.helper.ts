import { Server } from 'socket.io'

import { DirectoryExportedClassesLoaderHelper } from './directory-exported-classes-loader.helper'

import { SocketExecutorModel } from '../model/socket-executor.model'

import { SettingInterface } from '../interface/setting.interface'

/**
 * Helper to load use this library
 */
export class UsingHelper {
    /**
     * Create an executor to the socket server and return them
     */
    public static useSocketServer(io: Server, options?: SettingInterface): Server {
        this.createExecutor(io, options || {})

        return io
    }

    /**
     * Create an executor to the socket server
     */
    private static createExecutor(io: Server, options: SettingInterface): void {
        const executor = new SocketExecutorModel(io)

        // Import all middlewares
        let middlewareClasses: Array<Function> = new Array()

        if (options && options.middlewares && options.middlewares.length) {
            middlewareClasses = (options.middlewares as any[]).filter(middleware => middleware instanceof Function)
        }

        const middlewareDirs = (options.middlewares as any[]).filter(middleware => typeof middleware === 'string')
        middlewareClasses.push(...DirectoryExportedClassesLoaderHelper.importClassesFromDirectories(middlewareDirs))

        // Import all controllers
        let controllerClasses: Array<Function> = new Array()

        if (options && options.controllers && options.controllers.length) {
            controllerClasses = (options.controllers as any[]).filter(controller => controller instanceof Function)
        }

        const controllerDirs = (options.controllers as any[]).filter(controller => typeof controller === 'string')
        controllerClasses.push(...DirectoryExportedClassesLoaderHelper.importClassesFromDirectories(controllerDirs))

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