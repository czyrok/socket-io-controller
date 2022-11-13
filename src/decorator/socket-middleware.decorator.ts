import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { MiddlewareArgInterface } from '../interface/arg/middleware.arg.interface'

/**
 * Registers a new middleware to be registered in the socket.io
 */
export function SocketMiddleware(namespace?: string, priority?: number): Function {
    return function (object: Function) {
        const metadata: MiddlewareArgInterface = {
            target: object,
            namespace: namespace,
            priority: priority
        }

        StorageArgUtil.defaultStorage.middlewares.push(metadata)
    }
}