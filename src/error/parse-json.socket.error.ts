import { ServerError } from './server.error'

import codeErrorConfig from '../config/error-code.config.json'

/**
 * Caused when user parameter is given, but is invalid and cannot be parsed
 */
export class ParseJsonSocketError extends ServerError {
  constructor() {
    super(codeErrorConfig.JSON_PARSE_ERROR, 'User parameter cannot be parsed to JSON')
  }
}