import { ClassTransformOptions } from 'class-transformer'

import appointmentConfig from '../config/appointment.config.json'

import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ResultArgInterface } from '../interface/arg/result.arg.interface'

import { ResultTypeEnum } from '../enum/type/result.type.enum'

/**
 * If this decorator is set then after controller action will emit message with the given name or the function name after action execution
 * It will emit message only if controller throw an exception
 * If result is a Promise then it will wait until promise throw an error and emit a message
 */
export function EmitOnFail(messageName?: string, options?: { classTransformOptions?: ClassTransformOptions }): Function {
    return function (object: Object, methodName: string) {
        const metadata: ResultArgInterface = {
            target: object.constructor,
            method: methodName,
            type: ResultTypeEnum.EMIT_ON_FAIL,
            value: messageName || `${methodName}${appointmentConfig.EVENT.ERROR_MESSAGE_NAME}`,
            classTransformOptions: options?.classTransformOptions
        }

        StorageArgUtil.defaultStorage.results.push(metadata)
    }
}