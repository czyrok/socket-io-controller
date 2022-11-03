"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketExecutorModel = void 0;
const class_transformer_1 = require("class-transformer");
const path_to_regexp_1 = require("path-to-regexp");
const builder_arg_util_1 = require("../util/arg/builder.arg.util");
const parse_json_socket_error_1 = require("../error/parse-json.socket.error");
const controller_arg_model_1 = require("./arg/controller.arg.model");
const middleware_arg_model_1 = require("./arg/middleware.arg.model");
const parameter_type_enum_1 = require("../enum/type/parameter.type.enum");
const action_type_enum_1 = require("../enum/type/action.type.enum");
/**
 * Registers controllers and actions in the given server framework
 */
class SocketExecutorModel {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(io) {
        this.io = io;
        // -------------------------------------------------------------------------
        // Public properties
        // -------------------------------------------------------------------------
        /**
         * Indicates if class-transformer package should be used to perform message body serialization / deserialization
         * By default its enabled
         */
        this.useClassTransformer = true;
        /**
         * Global class transformer options passed to class-transformer during classToPlain operation
         * This operation is being executed when server returns response to user
         */
        this.classToPlainTransformOptions = {};
        /**
         * Global class transformer options passed to class-transformer during plainToClass operation
         * This operation is being executed when parsing user parameters
         */
        this.plainToClassTransformOptions = {};
        this.builder = new builder_arg_util_1.BuilderArgUtil();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Function to execute the executor, it registers middlewares and controllers
     */
    execute(middlewareClasses, controllerClasses) {
        this.registerAll(middlewareClasses, controllerClasses);
    }
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    /**
     * Register middlewares and controllers
     */
    registerAll(middlewareClasses, controllerClasses) {
        const middlewares = this.builder.buildMiddlewares(middlewareClasses);
        const controllers = this.builder.buildControllers(controllerClasses);
        this.registerWithoutNamespace(middlewares, controllers);
        let map = this.buildNamespaceMap(middlewares, controllers);
        map.forEach((values, key) => {
            let middlewares = this.recoverMiddlewaresFromMap(key, map);
            let controllers = this.recoverControllersFromMap(values);
            const namespaceIoServer = this.io.of((0, path_to_regexp_1.pathToRegexp)(key));
            for (let middleware of middlewares) {
                namespaceIoServer.use((socket, next) => {
                    middleware.instance.use(socket, next);
                });
            }
            namespaceIoServer.on('connection', (socket) => {
                this.handleConnection(controllers, socket);
            });
        });
    }
    /**
     * Build a middleware-controller-map per namespace
     */
    buildNamespaceMap(middlewares, controllers) {
        const filteredMiddlewares = middlewares.filter(ctrl => !!ctrl.namespace);
        const filteredControllers = controllers.filter(ctrl => !!ctrl.namespace);
        let map = new Map();
        filteredMiddlewares
            .sort((middleware1, middleware2) => middleware1.priority - middleware2.priority)
            .forEach(middleware => {
            var _a;
            let namespace = middleware.namespace;
            if (!map.has(namespace))
                map.set(namespace, []);
            (_a = map.get(namespace)) === null || _a === void 0 ? void 0 : _a.push(middleware);
        });
        filteredControllers.forEach(controller => {
            var _a;
            let namespace = controller.namespace;
            if (!map.has(namespace))
                map.set(namespace, []);
            (_a = map.get(namespace)) === null || _a === void 0 ? void 0 : _a.push(controller);
        });
        map = new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
        return map;
    }
    /**
     * Filter controllers from an array of middlewares and controllers
     */
    recoverControllersFromMap(array) {
        return array.filter((value) => value instanceof controller_arg_model_1.ControllerArgModel);
    }
    /**
     * Recover middlewares from start to the current key of the map that have a namespace contained in this key
     */
    recoverMiddlewaresFromMap(currentKey, map) {
        let middlewares = [];
        for (let line of map.entries()) {
            let key = line[0];
            if (currentKey.localeCompare(key) < 0) {
                break;
            }
            for (let value of line[1]) {
                if (value instanceof middleware_arg_model_1.MiddlewareArgModel && key.indexOf(value.namespace) == 0) {
                    middlewares.push(value);
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
        return middlewares;
    }
    /**
     * Register middlewares and controllers without namespace
     */
    registerWithoutNamespace(middlewares, controllers) {
        const filteredMiddlewares = middlewares.filter(ctrl => !ctrl.namespace);
        const filteredControllers = controllers.filter(ctrl => !ctrl.namespace);
        filteredMiddlewares
            .sort((middleware1, middleware2) => middleware1.priority - middleware2.priority)
            .forEach(middleware => {
            this.io.use((socket, next) => {
                middleware.instance.use(socket, next);
            });
        });
        this.io.on('connection', (socket) => this.handleConnection(filteredControllers, socket));
    }
    /**
     * Handle connection by controller and by action
     */
    handleConnection(controllers, socket) {
        controllers.forEach(controller => {
            controller.actions.forEach(action => {
                if (action.type === action_type_enum_1.ActionTypeEnum.CONNECT) {
                    this.handleAction(action, { socket: socket })
                        .then(result => this.handleSuccessResult(result, action, socket))
                        .catch(error => this.handleFailResult(error, action, socket));
                }
                else if (action.type === action_type_enum_1.ActionTypeEnum.DISCONNECT) {
                    socket.on('disconnect', () => {
                        this.handleAction(action, { socket: socket })
                            .then(result => this.handleSuccessResult(result, action, socket))
                            .catch(error => this.handleFailResult(error, action, socket));
                    });
                }
                else if (action.type === action_type_enum_1.ActionTypeEnum.MESSAGE) {
                    socket.on(action.name || '', (data) => {
                        // todo get multiple args
                        this.handleAction(action, { socket: socket, data: data })
                            .then(result => this.handleSuccessResult(result, action, socket))
                            .catch(error => this.handleFailResult(error, action, socket));
                    });
                }
            });
        });
    }
    /**
     * Handle connection by type of action
     */
    handleAction(action, options) {
        // compute all parameters
        const paramsPromises = action.params
            .sort((param1, param2) => param1.index - param2.index)
            .map(param => {
            if (param.type === parameter_type_enum_1.ParameterTypeEnum.CONNECTED_SOCKET) {
                return options.socket;
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.SOCKET_IO) {
                return this.io;
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.NAMESPACE_SOCKET_IO) {
                return options.socket.nsp;
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.SOCKET_QUERY_PARAM) {
                return options.socket.handshake.query[param.value];
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.SOCKET_ID) {
                return options.socket.id;
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.SOCKET_REQUEST) {
                return options.socket.request;
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.SOCKET_ROOMS) {
                return options.socket.rooms;
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.NAMESPACE_PARAMS) {
                return this.handleNamespaceParameters(options.socket, action, param);
            }
            else if (param.type === parameter_type_enum_1.ParameterTypeEnum.NAMESPACE_PARAM) {
                const params = this.handleNamespaceParameters(options.socket, action, param);
                return params.get(param.value);
            }
            else {
                return this.handleParameter(param, options);
            }
        });
        // after all parameters are computed
        const paramsPromise = Promise.all(paramsPromises).catch(error => {
            throw error;
        });
        return paramsPromise.then(params => {
            return action.executeAction(params);
        });
    }
    /**
     * Handle parameter entered by the user
     */
    handleParameter(param, options) {
        let value = options.data;
        if (value !== null && value !== undefined && value !== '')
            value = this.handleParameterFormat(value, param);
        // if transform function is given for this param then apply it
        if (param.transform)
            value = param.transform(value, options.socket);
        return value;
    }
    /**
     * Handle parameter format
     */
    handleParameterFormat(value, param) {
        const format = param.reflectedType;
        const formatName = format instanceof Function && format.name ? format.name : format instanceof String ? format : '';
        switch (formatName.toLowerCase()) {
            case 'number':
                return +value;
            case 'string':
                return value;
            case 'boolean':
                if (value === 'true') {
                    return true;
                }
                else if (value === 'false') {
                    return false;
                }
                return !!value;
            default:
                const isObjectFormat = format instanceof Function || formatName.toLowerCase() === 'object';
                if (value && isObjectFormat)
                    value = this.parseParameterValue(value, param);
        }
        return value;
    }
    /**
     * Parse parameter value
     */
    parseParameterValue(value, param) {
        try {
            const parseValue = typeof value === 'string' ? JSON.parse(value) : value;
            if (param.reflectedType !== Object && param.reflectedType && this.useClassTransformer) {
                const options = param.classTransformOptions || this.plainToClassTransformOptions;
                return (0, class_transformer_1.plainToInstance)(param.reflectedType, parseValue, options);
            }
            else {
                return parseValue;
            }
        }
        catch (err) {
            throw new parse_json_socket_error_1.ParseJsonSocketError();
        }
    }
    /**
     * Handle the success of the controller function
     */
    handleSuccessResult(result, action, socket) {
        if (result !== null && result !== undefined && action.emitNamespaceBroadcastOnSuccess) {
            const transformOptions = action.emitNamespaceBroadcastOnSuccess.classTransformOptions || this.classToPlainTransformOptions;
            const transformedResult = this.useClassTransformer && result instanceof Object ? (0, class_transformer_1.instanceToPlain)(result, transformOptions) : result;
            socket.broadcast.emit(action.emitNamespaceBroadcastOnSuccess.value, transformedResult);
        }
        else if (result !== null && result !== undefined && action.emitOnSuccess) {
            const transformOptions = action.emitOnSuccess.classTransformOptions || this.classToPlainTransformOptions;
            const transformedResult = this.useClassTransformer && result instanceof Object ? (0, class_transformer_1.instanceToPlain)(result, transformOptions) : result;
            socket.emit(action.emitOnSuccess.value, transformedResult);
        }
        else if ((result === null || result === undefined) && action.emitOnSuccess && !action.skipEmitOnEmptyResult) {
            socket.emit(action.emitOnSuccess.value);
        }
    }
    /**
     * Handle the fail of the controller function
     */
    handleFailResult(result, action, socket) {
        var _a;
        if (result !== null && result !== undefined && action.emitOnFail) {
            const transformOptions = ((_a = action.emitOnSuccess) === null || _a === void 0 ? void 0 : _a.classTransformOptions) || this.classToPlainTransformOptions;
            let transformedResult = this.useClassTransformer && result instanceof Object ? (0, class_transformer_1.instanceToPlain)(result, transformOptions) : result;
            if (result instanceof Error && !Object.keys(transformedResult).length) {
                transformedResult = result.toString();
            }
            socket.emit(action.emitOnFail.value, transformedResult);
        }
        else if ((result === null || result === undefined) && action.emitOnFail && !action.skipEmitOnEmptyResult) {
            socket.emit(action.emitOnFail.value);
        }
    }
    /**
     * Handle parameters of the namespace
     */
    handleNamespaceParameters(socket, action, param) {
        const keys = [], regexp = (0, path_to_regexp_1.pathToRegexp)(action.controller.namespace || '', keys), params = new Map(), parts = regexp.exec(socket.nsp.name);
        if (parts === null)
            return new Map();
        keys.forEach((key, index) => {
            params.set(key.name, this.handleParameterFormat(parts[index + 1], param));
        });
        return params;
    }
}
exports.SocketExecutorModel = SocketExecutorModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LWV4ZWN1dG9yLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL3NvY2tldC1leGVjdXRvci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBMkY7QUFDM0YsbURBQWtEO0FBR2xELG1FQUE2RDtBQUU3RCw4RUFBdUU7QUFJdkUscUVBQStEO0FBQy9ELHFFQUErRDtBQUUvRCwwRUFBb0U7QUFDcEUsb0VBQThEO0FBRTlEOztHQUVHO0FBQ0gsTUFBYSxtQkFBbUI7SUFnQzlCLDRFQUE0RTtJQUM1RSxjQUFjO0lBQ2QsNEVBQTRFO0lBRTVFLFlBQW9CLEVBQVU7UUFBVixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBbkM5Qiw0RUFBNEU7UUFDNUUsb0JBQW9CO1FBQ3BCLDRFQUE0RTtRQUU1RTs7O1dBR0c7UUFDSSx3QkFBbUIsR0FBWSxJQUFJLENBQUE7UUFFMUM7OztXQUdHO1FBQ0ksaUNBQTRCLEdBQTBCLEVBQUUsQ0FBQTtRQUUvRDs7O1dBR0c7UUFDSSxpQ0FBNEIsR0FBMEIsRUFBRSxDQUFBO1FBZ0I3RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFBO0lBQ3JDLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsaUJBQWlCO0lBQ2pCLDRFQUE0RTtJQUU1RTs7T0FFRztJQUNJLE9BQU8sQ0FBQyxpQkFBbUMsRUFBRSxpQkFBbUM7UUFDckYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsa0JBQWtCO0lBQ2xCLDRFQUE0RTtJQUU1RTs7T0FFRztJQUNLLFdBQVcsQ0FBQyxpQkFBbUMsRUFBRSxpQkFBbUM7UUFDMUYsTUFBTSxXQUFXLEdBQThCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUMvRixNQUFNLFdBQVcsR0FB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