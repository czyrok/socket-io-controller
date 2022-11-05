import 'reflect-metadata'
import { ClassTransformOptions } from 'class-transformer'

import appointmentConfig from '../config/appointment.config.json'

import { ControllerArgInterface } from '../interface/arg/controller.arg.interface'
import { ActionArgInterface } from '../interface/arg/action.arg.interface'
import { ParameterArgInterface } from '../interface/arg/parameter.arg.interface'
import { MiddlewareArgInterface } from '../interface/arg/middleware.arg.interface'
import { ResultArgInterface } from '../interface/arg/result.arg.interface'

import { ActionTypeEnum } from '../enum/type/action.type.enum'
import { ParameterTypeEnum } from '../enum/type/parameter.type.enum'
import { ResultTypeEnum } from '../enum/type/result.type.enum'
import { StorageArgUtil } from '../util/arg/storage.arg.util'

/**
 * Registers a class to be a socket controller that can listen to websocket events and respond to them
 *
 * @param namespace Namespace in which this controller's events will be registered
 */
export function SocketController(namespace?: string): Function {
  return function (object: Function) {
    const metadata: ControllerArgInterface = {
      namespace: namespace,
      target: object,
    }

    StorageArgUtil.defaultStorage.controllers.push(metadata)
  }
}

/**
 * Registers controller's action to be executed when socket receives message with given name
 */
export function OnMessage(name?: string): Function {
  return function (object: Object, methodName: string) {
    const metadata: ActionArgInterface = {
      name: name || methodName,
      target: object.constructor,
      method: methodName,
      type: ActionTypeEnum.MESSAGE,
    }

    StorageArgUtil.defaultStorage.actions.push(metadata)
  }
}

/**
 * Registers controller's action to be executed when client connects to the socket
 */
export function OnConnect(): Function {
  return function (object: Object, methodName: string) {
    const metadata: ActionArgInterface = {
      target: object.constructor,
      method: methodName,
      type: ActionTypeEnum.CONNECT,
    }

    StorageArgUtil.defaultStorage.actions.push(metadata)
  }
}

/**
 * Registers controller's action to be executed when client disconnects from the socket
 */
export function OnDisconnect(): Function {
  return function (object: Object, methodName: string) {
    const metadata: ActionArgInterface = {
      target: object.constructor,
      method: methodName,
      type: ActionTypeEnum.DISCONNECT,
    }

    StorageArgUtil.defaultStorage.actions.push(metadata)
  }
}

/**
 * Injects connected client's socket object to the controller action
 */
export function ConnectedSocket() {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.CONNECTED_SOCKET,
      reflectedType: format,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects socket.io object that initialized a connection
 */
export function SocketIO() {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.SOCKET_IO,
      reflectedType: format,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects socket.io object that initialized a connection to the namespace
 */
 export function NamespaceSocketIO() {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.NAMESPACE_SOCKET_IO,
      reflectedType: format,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects received message body
 */
export function MessageBody(options?: { classTransformOptions?: ClassTransformOptions }) {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.SOCKET_BODY,
      reflectedType: format,
      classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects query parameter from the received socket request
 */
export function SocketQueryParam(name?: string) {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.SOCKET_QUERY_PARAM,
      reflectedType: format,
      value: name,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects socket id from the received request
 */
export function SocketId() {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.SOCKET_ID,
      reflectedType: format,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects request object received by socket
 */
export function SocketRequest() {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.SOCKET_REQUEST,
      reflectedType: format,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects parameters of the connected socket namespace
 */
export function NspParams() {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.NAMESPACE_PARAMS,
      reflectedType: format,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects named param from the connected socket namespace
 */
export function NspParam(name: string) {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.NAMESPACE_PARAM,
      reflectedType: format,
      value: name,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Injects rooms of the connected socket client
 */
export function SocketRooms() {
  return function (object: Object, methodName: string, index: number) {
    const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

    const metadata: ParameterArgInterface = {
      target: object.constructor,
      method: methodName,
      index: index,
      type: ParameterTypeEnum.SOCKET_ROOMS,
      reflectedType: format,
    }

    StorageArgUtil.defaultStorage.parameters.push(metadata)
  }
}

/**
 * Registers a new middleware to be registered in the socket.io
 */
export function Middleware(namespace?: string, priority?: number): Function {
  return function (object: Function) {
    const metadata: MiddlewareArgInterface = {
      target: object,
      namespace: namespace,
      priority: priority,
    }

    StorageArgUtil.defaultStorage.middlewares.push(metadata)
  }
}

/**
 * If this decorator is set then after controller action will emit message with the given name after action execution
 * It will emit message only if controller succeed without errors
 * If result is a Promise then it will wait until promise is resolved and emit a broadcast message
 */
 export function EmitNamespaceBroadcastOnSuccess(
  messageName?: string,
  options?: { classTransformOptions?: ClassTransformOptions }
): Function {
  return function (object: Object, methodName: string) {
    const metadata: ResultArgInterface = {
      target: object.constructor,
      method: methodName,
      type: ResultTypeEnum.EMIT_NAMESPACE_BROADCAST_ON_SUCCESS,
      value: messageName || methodName,
      classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
    }

    StorageArgUtil.defaultStorage.results.push(metadata)
  }
}

/**
 * If this decorator is set then after controller action will emit message with the given name after action execution
 * It will emit message only if controller succeed without errors
 * If result is a Promise then it will wait until promise is resolved and emit a message
 */
export function EmitOnSuccess(
  messageName?: string,
  options?: { classTransformOptions?: ClassTransformOptions }
): Function {
  return function (object: Object, methodName: string) {
    const metadata: ResultArgInterface = {
      target: object.constructor,
      method: methodName,
      type: ResultTypeEnum.EMIT_ON_SUCCESS,
      value: messageName || methodName,
      classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
    }

    StorageArgUtil.defaultStorage.results.push(metadata)
  }
}

/**
 * If this decorator is set then after controller action will emit message with the given name after action execution
 * It will emit message only if controller throw an exception
 * If result is a Promise then it will wait until promise throw an error and emit a message
 */
export function EmitOnFail(messageName?: string, options?: { classTransformOptions?: ClassTransformOptions }): Function {
  return function (object: Object, methodName: string) {
    const metadata: ResultArgInterface = {
      target: object.constructor,
      method: methodName,
      type: ResultTypeEnum.EMIT_ON_FAIL,
      value: messageName || `${methodName}${appointmentConfig.EVENT.MESSAGE_NAME}`,
      classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
    }

    StorageArgUtil.defaultStorage.results.push(metadata)
  }
}

/**
 * Used in conjunction with @EmitOnSuccess and @EmitOnFail decorators
 * If result returned by controller action is null or undefined then messages will not be emitted by @EmitOnSuccess
 * or @EmitOnFail decorators
 */
export function SkipEmitOnEmptyResult(): Function {
  return function (object: Object, methodName: string) {
    const metadata: ResultArgInterface = {
      target: object.constructor,
      method: methodName,
      type: ResultTypeEnum.SKIP_EMIT_ON_EMPTY_RESULT,
    }

    StorageArgUtil.defaultStorage.results.push(metadata)
  }
}