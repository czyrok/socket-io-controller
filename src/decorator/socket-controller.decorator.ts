import { Namespace } from 'socket.io'

import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ControllerArgInterface } from '../interface/arg/controller.arg.interface'

/**
 * Registers a class to be a socket controller that can listen to websocket events and respond to them
 *
 * @param namespace Namespace in which this controller's events will be registered
 */
export function SocketController(options?: { namespace?: string, init: (io: Namespace) => void }): Function {
    return function (object: Function) {
        const metadata: ControllerArgInterface = {
            namespace: options?.namespace,
            init: options?.init,
            target: object
        }

        StorageArgUtil.defaultStorage.controllers.push(metadata)
    }
}