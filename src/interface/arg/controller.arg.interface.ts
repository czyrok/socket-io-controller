import { Namespace } from 'socket.io'

/**
 * Metadata used to storage information about registered controller
 */
export interface ControllerArgInterface {
  /**
   * Indicates object which is used by this controller
   */
  target: Function

  /**
   * Extra namespace in which this controller's events will be registered
   */
  namespace?: string

  /**
   * Extra initialization function which it uses at the initialization of the controller
   */
  init?: (io: Namespace) => void
}