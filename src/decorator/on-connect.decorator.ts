import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ActionArgInterface } from '../interface/arg/action.arg.interface'

import { ActionTypeEnum } from '../enum/type/action.type.enum'

/**
 * Registers controller's action to be executed when client connects to the socket
 */
export function OnConnect(): Function {
    return function (object: Object, methodName: string) {
        const metadata: ActionArgInterface = {
            target: object.constructor,
            method: methodName,
            type: ActionTypeEnum.CONNECT
        }

        StorageArgUtil.defaultStorage.actions.push(metadata)
    }
}