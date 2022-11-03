/**
 * Metadata used to storage information about registered middleware
 */
export interface MiddlewareArgInterface {
  /**
   * Indicates object which is used by this middleware
   */
  target: Function

  /**
   * Extra namespace in which this middleware's events will be registered
   */
  namespace?: string

  /**
   * Middleware priority
   */
  priority?: number
}
