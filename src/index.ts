export * from './decorator/connected-socket.decorator'
export * from './decorator/emit-namespace-broadcast-on-success.decorator'
export * from './decorator/emit-on-fail.decorator'
export * from './decorator/emit-on-success.decorator'
export * from './decorator/message-body.decorator'
export * from './decorator/namespace-param.decorator'
export * from './decorator/namespace-params.decorator'
export * from './decorator/namespace-socket-io.decorator'
export * from './decorator/on-connect.decorator'
export * from './decorator/on-disconnect.decorator'
export * from './decorator/on-message.decorator'
export * from './decorator/skip-emit-on-empty-result.decorator'
export * from './decorator/socket-controller.decorator'
export * from './decorator/socket-id.decorator'
export * from './decorator/socket-io.decorator'
export * from './decorator/socket-middleware.decorator'
export * from './decorator/socket-query-param.decorator'
export * from './decorator/socket-request.decorator'
export * from './decorator/socket-rooms.decorator'

export * from './helper/container.helper'

export * from './error/server.error'
export * from './error/parse-json.socket.error'

export * from './interface/middleware.interface'

import { Server } from 'socket.io'

import { ExecutorHelper } from './helper/executor.helper'

import { SettingInterface } from './interface/setting.interface'

/**
 * Default namespace of this project
 */
export namespace SocketIoController {
    /**
     * Create an executor to the socket server and return them
     */
    export function useSocketIoServer(io: Server, options?: SettingInterface): Server {
        ExecutorHelper.createExecutor(io, options || {})

        return io
    }
}