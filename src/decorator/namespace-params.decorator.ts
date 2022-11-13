import 'reflect-metadata'

import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ParameterArgInterface } from '../interface/arg/parameter.arg.interface'

import { ParameterTypeEnum } from '../enum/type/parameter.type.enum'

/**
 * Injects parameters of the connected socket namespace
 */
export function NamespaceParams() {
    return function (object: Object, methodName: string, index: number) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index]

        const metadata: ParameterArgInterface = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: ParameterTypeEnum.NAMESPACE_PARAMS,
            reflectedType: format
        }

        StorageArgUtil.defaultStorage.parameters.push(metadata)
    }
}