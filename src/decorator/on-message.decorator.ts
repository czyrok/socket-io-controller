import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ActionArgInterface } from '../interface/arg/action.arg.interface'

import { ActionTypeEnum } from '../enum/type/action.type.enum'

/**
 * Registers controller's action to be executed when socket receives message with given name
 */
export function OnMessage(name?: string): Function {
    return function (object: Object, methodName: string) {
        const metadata: ActionArgInterface = {
            name: name || methodName,
            target: object.constructor,
            method: methodName,
            type: ActionTypeEnum.MESSAGE
        }

        StorageArgUtil.defaultStorage.actions.push(metadata)
    }
}