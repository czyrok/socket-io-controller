import { ServerError } from './server.error'

/**
 * Caused when the socket can't get instance of the class with the container given by the user
 */
export class GetInstanceSocketError extends ServerError {
  constructor() {
    super(500, 'User container cannot be used to get instance of the object')
  }
}