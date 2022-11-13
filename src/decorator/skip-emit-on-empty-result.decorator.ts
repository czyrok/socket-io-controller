import { StorageArgUtil } from '../util/arg/storage.arg.util'

import { ResultArgInterface } from '../interface/arg/result.arg.interface'

import { ResultTypeEnum } from '../enum/type/result.type.enum'

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
      type: ResultTypeEnum.SKIP_EMIT_ON_EMPTY_RESULT
    }

    StorageArgUtil.defaultStorage.results.push(metadata)
  }
}