import { ServerError } from './server.error'

/**
 * Caused when user parameter is given, but is invalid and cannot be parsed
 */
export class ParseJsonSocketError extends ServerError {
  constructor() {
    super(500, 'User parameter cannot be parsed to JSON')
  }
}