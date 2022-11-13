import 'reflect-metadata'
import { ClassTransformOptions } from 'class-transformer'

import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ParameterArgInterface } from '../interface/arg/parameter.arg.interface'

import { ParameterTypeEnum } from '../enum/type/parameter.type.enum'

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
            classTransformOptions: options?.classTransformOptions
        }

        StorageArgUtil.defaultStorage.parameters.push(metadata)
    }
}