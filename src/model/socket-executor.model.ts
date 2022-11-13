import { ClassTransformOptions, instanceToPlain, plainToInstance } from 'class-transformer'
import { Key, pathToRegexp } from 'path-to-regexp'
import { Namespace, Server, Socket } from 'socket.io'

import { BuilderArgUtil } from '../util/arg/builder.arg.util'

import { ParseJsonSocketError } from '../error/parse-json.socket.error'

import { ActionArgModel } from './arg/action.arg.model'
import { ParameterArgModel } from './arg/paramater.arg.model'
import { ControllerArgModel } from './arg/controller.arg.model'
import { MiddlewareArgModel } from './arg/middleware.arg.model'

import { ParameterTypeEnum } from '../enum/type/parameter.type.enum'
import { ActionTypeEnum } from '../enum/type/action.type.enum'

/**
 * Registers controllers and actions in the given server framework
 */
export class SocketExecutorModel {
  // -------------------------------------------------------------------------
  // Public properties
  // -------------------------------------------------------------------------

  /**
   * Indicates if class-transformer package should be used to perform message body serialization / deserialization
   * By default its enabled
   */
  public useClassTransformer: boolean = true

  /**
   * Global class transformer options passed to class-transformer during classToPlain operation
   * This operation is being executed when server returns response to user
   */
  public classToPlainTransformOptions: ClassTransformOptions = {}

  /**
   * Global class transformer options passed to class-transformer during plainToClass operation
   * This operation is being executed when parsing user parameters
   */
  public plainToClassTransformOptions: ClassTransformOptions = {}

  // -------------------------------------------------------------------------
  // Private properties
  // -------------------------------------------------------------------------

  /**
   * Builder to build arg model with stored arg interface 
   */
  private builder: BuilderArgUtil

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(private io: Server) {
    this.builder = new BuilderArgUtil()
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Function to execute the executor, it registers middlewares and controllers
   */
  public execute(middlewareClasses?: Array<Function>, controllerClasses?: Array<Function>): void {
    this.registerAll(middlewareClasses, controllerClasses)
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  /**
   * Register middlewares and controllers
   */
  private registerAll(middlewareClasses?: Array<Function>, controllerClasses?: Array<Function>): void {
    const middlewares: Array<MiddlewareArgModel> = this.builder.buildMiddlewares(middlewareClasses)
    const controllers: Array<ControllerArgModel> = this.builder.buildControllers(controllerClasses)

    this.registerWithoutNamespace(middlewares, controllers)

    let map: Map<string, Array<MiddlewareArgModel | ControllerArgModel>> = this.buildNamespaceMap(middlewares, controllers)

    map.forEach((values: Array<MiddlewareArgModel | ControllerArgModel>, key: string) => {
      let middlewares: Array<MiddlewareArgModel> = this.recoverMiddlewaresFromMap(key, map)
      let controllers: Array<ControllerArgModel> = this.recoverControllersFromMap(values)

      const namespaceIoServer: Namespace = this.io.of(pathToRegexp(key))

      for (let middleware of middlewares) {
        namespaceIoServer.use((socket: Socket, next: (err?: any) => any) => {
          middleware.instance.use(socket, next)
        })
      }

      for (let controller of controllers) {
        if (controller.init !== undefined) controller.init(namespaceIoServer)
      }

      namespaceIoServer.on('connection', (socket: Socket) => {
        this.handleConnection(controllers, socket)
      })
    })
  }

  /**
   * Build a middleware-controller-map per namespace
   */
  private buildNamespaceMap(middlewares: Array<MiddlewareArgModel>, controllers: Array<ControllerArgModel>): Map<string, Array<MiddlewareArgModel | ControllerArgModel>> {
    const filteredMiddlewares: Array<MiddlewareArgModel> = middlewares.filter(ctrl => !!ctrl.namespace)
    const filteredControllers: Array<ControllerArgModel> = controllers.filter(ctrl => !!ctrl.namespace)

    let map: Map<string, Array<MiddlewareArgModel | ControllerArgModel>> = new Map()

    filteredMiddlewares
      .sort((middleware1, middleware2) => middleware1.priority - middleware2.priority)
      .forEach(middleware => {
        let namespace: string = middleware.namespace

        if (!map.has(namespace)) map.set(namespace, [])

        map.get(namespace)?.push(middleware)
      })

    filteredControllers.forEach(controller => {
      let namespace: string = controller.namespace

      if (!map.has(namespace)) map.set(namespace, [])

      map.get(namespace)?.push(controller)
    })

    map = new Map([...map.entries()].sort((a: [string, (MiddlewareArgModel | ControllerArgModel)[]], b: [string, (MiddlewareArgModel | ControllerArgModel)[]]) => a[0].localeCompare(b[0])))

    return map
  }

  /**
   * Filter controllers from an array of middlewares and controllers
   */
  private recoverControllersFromMap(array: Array<MiddlewareArgModel | ControllerArgModel>): Array<ControllerArgModel> {
    return array.filter((value: MiddlewareArgModel | ControllerArgModel) => value instanceof ControllerArgModel) as Array<ControllerArgModel>
  }

  /**
   * Recover middlewares from start to the current key of the map that have a namespace contained in this key
   */
  private recoverMiddlewaresFromMap(currentKey: string, map: Map<string, Array<MiddlewareArgModel | ControllerArgModel>>): Array<MiddlewareArgModel> {
    let middlewares: Array<MiddlewareArgModel> = []

    for (let line of map.entries()) {
      let key: string = line[0]

      if (currentKey.localeCompare(key) < 0) {
        break
      }

      for (let value of line[1]) {
        if (value instanceof MiddlewareArgModel && key.indexOf(value.namespace) == 0) {
          middlewares.push(value)
        }
      }
    }

    /* map.forEach((values: Array<MiddlewareArgModel | ControllerArgModel>, key: string) => {
      if (currentKey.localeCompare(key) < 0) return

      for (let value of values) {
        if (value instanceof MiddlewareArgModel && key.indexOf(value.instance) == 0) {
          middlewares.push(value)
        }
      }
    }) */

    return middlewares
  }

  /**
   * Register middlewares and controllers without namespace
   */
  private registerWithoutNamespace(middlewares: Array<MiddlewareArgModel>, controllers: Array<ControllerArgModel>): void {
    const filteredMiddlewares: Array<MiddlewareArgModel> = middlewares.filter(ctrl => !ctrl.namespace)
    const filteredControllers: Array<ControllerArgModel> = controllers.filter(ctrl => !ctrl.namespace)

    filteredMiddlewares
      .sort((middleware1, middleware2) => middleware1.priority - middleware2.priority)
      .forEach(middleware => {
        this.io.use((socket: Socket, next: (err?: any) => any) => {
          middleware.instance.use(socket, next)
        })
      })

    this.io.on('connection', (socket: Socket) => this.handleConnection(filteredControllers, socket))
  }

  /**
   * Handle connection by controller and by action
   */
  private handleConnection(controllers: Array<ControllerArgModel>, socket: Socket): void {
    controllers.forEach(controller => {
      controller.actions.forEach(action => {
        if (action.type === ActionTypeEnum.CONNECT) {
          this.handleAction(action, { socket: socket })
            .then(result => this.handleSuccessResult(result, action, socket))
            .catch(error => this.handleFailResult(error, action, socket))
        } else if (action.type === ActionTypeEnum.DISCONNECT) {
          socket.on('disconnect', () => {
            this.handleAction(action, { socket: socket })
              .then(result => this.handleSuccessResult(result, action, socket))
              .catch(error => this.handleFailResult(error, action, socket))
          })
        } else if (action.type === ActionTypeEnum.MESSAGE) {
          socket.on(action.name || '', (data: any) => {
            // todo get multiple args
            this.handleAction(action, { socket: socket, data: data })
              .then(result => this.handleSuccessResult(result, action, socket))
              .catch(error => this.handleFailResult(error, action, socket))
          })
        }
      })
    })
  }

  /**
   * Handle connection by type of action
   */
  private handleAction(action: ActionArgModel, options: { socket: Socket, data?: any }): Promise<any> {
    // compute all parameters
    const paramsPromises = action.params
      .sort((param1, param2) => param1.index - param2.index)
      .map(param => {
        if (param.type === ParameterTypeEnum.CONNECTED_SOCKET) {
          return options.socket
        } else if (param.type === ParameterTypeEnum.SOCKET_IO) {
          return this.io
        } else if (param.type === ParameterTypeEnum.NAMESPACE_SOCKET_IO) {
          return options.socket.nsp
        } else if (param.type === ParameterTypeEnum.SOCKET_QUERY_PARAM) {
          return options.socket.handshake.query[param.value]
        } else if (param.type === ParameterTypeEnum.SOCKET_ID) {
          return options.socket.id
        } else if (param.type === ParameterTypeEnum.SOCKET_REQUEST) {
          return options.socket.request
        } else if (param.type === ParameterTypeEnum.SOCKET_ROOMS) {
          return options.socket.rooms
        } else if (param.type === ParameterTypeEnum.NAMESPACE_PARAMS) {
          return this.handleNamespaceParameters(options.socket, action, param)
        } else if (param.type === ParameterTypeEnum.NAMESPACE_PARAM) {
          const params: Map<string, unknown> = this.handleNamespaceParameters(options.socket, action, param)

          return params.get(param.value)
        } else {
          return this.handleParameter(param, options)
        }
      })

    // after all parameters are computed
    const paramsPromise = Promise.all(paramsPromises).catch(error => {
      throw error
    })

    return paramsPromise.then(params => {
      return action.executeAction(params)
    })
  }

  /**
   * Handle parameter entered by the user
   */
  private handleParameter(param: ParameterArgModel, options: { socket: Socket, data?: any }) {
    let value = options.data

    if (value !== null && value !== undefined && value !== '') value = this.handleParameterFormat(value, param)

    // if transform function is given for this param then apply it
    if (param.transform) value = param.transform(value, options.socket)

    return value
  }

  /**
   * Handle parameter format
   */
  private handleParameterFormat(value: any, param: ParameterArgModel): unknown {
    const format = param.reflectedType
    const formatName = format instanceof Function && format.name ? format.name : format instanceof String ? format : ''

    switch (formatName.toLowerCase()) {
      case 'number':
        return +value

      case 'string':
        return value

      case 'boolean':
        if (value === 'true') {
          return true
        } else if (value === 'false') {
          return false
        }
        return !!value

      default:
        const isObjectFormat: boolean = format instanceof Function || formatName.toLowerCase() === 'object'

        if (value && isObjectFormat) value = this.parseParameterValue(value, param)
    }

    return value
  }

  /**
   * Parse parameter value
   */
  private parseParameterValue(value: any, param: ParameterArgModel): unknown {
    try {
      const parseValue = typeof value === 'string' ? JSON.parse(value) : value

      if (param.reflectedType !== Object && param.reflectedType && this.useClassTransformer) {
        const options = param.classTransformOptions || this.plainToClassTransformOptions

        return plainToInstance(param.reflectedType, parseValue, options)
      } else {
        return parseValue
      }
    } catch (err) {
      throw new ParseJsonSocketError()
    }
  }

  /**
   * Handle the success of the controller function
   */
  private handleSuccessResult(result: any, action: ActionArgModel, socket: Socket) {
    if (result !== null && result !== undefined && action.emitNamespaceBroadcastOnSuccess) {
      const transformOptions = action.emitNamespaceBroadcastOnSuccess.classTransformOptions || this.classToPlainTransformOptions

      const transformedResult =
        this.useClassTransformer && result instanceof Object ? instanceToPlain(result, transformOptions) : result

      socket.broadcast.emit(action.emitNamespaceBroadcastOnSuccess.value, transformedResult)
    } else if (result !== null && result !== undefined && action.emitOnSuccess) {
      const transformOptions = action.emitOnSuccess.classTransformOptions || this.classToPlainTransformOptions

      const transformedResult =
        this.useClassTransformer && result instanceof Object ? instanceToPlain(result, transformOptions) : result

      socket.emit(action.emitOnSuccess.value, transformedResult)
    } else if ((result === null || result === undefined) && action.emitOnSuccess && !action.skipEmitOnEmptyResult) {
      socket.emit(action.emitOnSuccess.value)
    }
  }

  /**
   * Handle the fail of the controller function
   */
  private handleFailResult(result: any, action: ActionArgModel, socket: Socket) {
    if (result !== null && result !== undefined && action.emitOnFail) {
      const transformOptions = action.emitOnSuccess?.classTransformOptions || this.classToPlainTransformOptions

      let transformedResult =
        this.useClassTransformer && result instanceof Object ? instanceToPlain(result, transformOptions) : result

      if (result instanceof Error && !Object.keys(transformedResult).length) {
        transformedResult = result.toString()
      }

      socket.emit(action.emitOnFail.value, transformedResult)
    } else if ((result === null || result === undefined) && action.emitOnFail && !action.skipEmitOnEmptyResult) {
      socket.emit(action.emitOnFail.value)
    }
  }

  /**
   * Handle parameters of the namespace
   */
  private handleNamespaceParameters(socket: Socket, action: ActionArgModel, param: ParameterArgModel): Map<string, unknown> {
    const keys: Array<Key> = [],
      regexp = pathToRegexp(action.controller.namespace || '', keys),
      params: Map<string, unknown> = new Map(),
      parts: RegExpExecArray | null = regexp.exec(socket.nsp.name)

    if (parts === null) return new Map()

    keys.forEach((key: Key, index: number) => {
      params.set(key.name as string, this.handleParameterFormat(parts[index + 1], param))
    })

    return params
  }
}
