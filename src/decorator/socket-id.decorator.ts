import 'reflect-metadata'

import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ParameterArgInterface } from '../interface/arg/parameter.arg.interface'

import { ParameterTypeEnum } from '../enum/type/parameter.type.enum'

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
            reflectedType: format
        }

        StorageArgUtil.defaultStorage.parameters.push(metadata)
    }
}