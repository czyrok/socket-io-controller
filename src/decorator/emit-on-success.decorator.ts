import { ClassTransformOptions } from 'class-transformer'

import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ResultArgInterface } from '../interface/arg/result.arg.interface'

import { ResultTypeEnum } from '../enum/type/result.type.enum'

/**
 * If this decorator is set then after controller action will emit message with the given name or the function name after action execution
 * It will emit message only if controller succeed without errors
 * If result is a Promise then it will wait until promise is resolved and emit a message
 */
export function EmitOnSuccess(messageName?: string, options?: { classTransformOptions?: ClassTransformOptions }): Function {
    return function (object: Object, methodName: string) {
        const metadata: ResultArgInterface = {
            target: object.constructor,
            method: methodName,
            type: ResultTypeEnum.EMIT_ON_SUCCESS,
            value: messageName || methodName,
            classTransformOptions: options?.classTransformOptions
        }

        StorageArgUtil.defaultStorage.results.push(metadata)
    }
}