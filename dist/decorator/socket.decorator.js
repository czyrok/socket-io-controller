"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipEmitOnEmptyResult = exports.EmitOnFail = exports.EmitOnSuccess = exports.EmitNamespaceBroadcastOnSuccess = exports.Middleware = exports.SocketRooms = exports.NspParam = exports.NspParams = exports.SocketRequest = exports.SocketId = exports.SocketQueryParam = exports.MessageBody = exports.NamespaceSocketIO = exports.SocketIO = exports.ConnectedSocket = exports.OnDisconnect = exports.OnConnect = exports.OnMessage = exports.SocketController = void 0;
require("reflect-metadata");
const appointment_config_json_1 = __importDefault(require("../config/appointment.config.json"));
const action_type_enum_1 = require("../enum/type/action.type.enum");
const parameter_type_enum_1 = require("../enum/type/parameter.type.enum");
const result_type_enum_1 = require("../enum/type/result.type.enum");
const storage_arg_util_1 = require("../util/arg/storage.arg.util");
/**
 * Registers a class to be a socket controller that can listen to websocket events and respond to them
 *
 * @param namespace Namespace in which this controller's events will be registered
 */
function SocketController(namespace) {
    return function (object) {
        const metadata = {
            namespace: namespace,
            target: object,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.controllers.push(metadata);
    };
}
exports.SocketController = SocketController;
/**
 * Registers controller's action to be executed when socket receives message with given name
 */
function OnMessage(name) {
    return function (object, methodName) {
        const metadata = {
            name: name || methodName,
            target: object.constructor,
            method: methodName,
            type: action_type_enum_1.ActionTypeEnum.MESSAGE,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.actions.push(metadata);
    };
}
exports.OnMessage = OnMessage;
/**
 * Registers controller's action to be executed when client connects to the socket
 */
function OnConnect() {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: action_type_enum_1.ActionTypeEnum.CONNECT,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.actions.push(metadata);
    };
}
exports.OnConnect = OnConnect;
/**
 * Registers controller's action to be executed when client disconnects from the socket
 */
function OnDisconnect() {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: action_type_enum_1.ActionTypeEnum.DISCONNECT,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.actions.push(metadata);
    };
}
exports.OnDisconnect = OnDisconnect;
/**
 * Injects connected client's socket object to the controller action
 */
function ConnectedSocket() {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.CONNECTED_SOCKET,
            reflectedType: format,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.ConnectedSocket = ConnectedSocket;
/**
 * Injects socket.io object that initialized a connection
 */
function SocketIO() {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.SOCKET_IO,
            reflectedType: format,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.SocketIO = SocketIO;
/**
 * Injects socket.io object that initialized a connection to the namespace
 */
function NamespaceSocketIO() {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.NAMESPACE_SOCKET_IO,
            reflectedType: format,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.NamespaceSocketIO = NamespaceSocketIO;
/**
 * Injects received message body
 */
function MessageBody(options) {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.SOCKET_BODY,
            reflectedType: format,
            classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.MessageBody = MessageBody;
/**
 * Injects query parameter from the received socket request
 */
function SocketQueryParam(name) {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.SOCKET_QUERY_PARAM,
            reflectedType: format,
            value: name,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.SocketQueryParam = SocketQueryParam;
/**
 * Injects socket id from the received request
 */
function SocketId() {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.SOCKET_ID,
            reflectedType: format,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.SocketId = SocketId;
/**
 * Injects request object received by socket
 */
function SocketRequest() {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.SOCKET_REQUEST,
            reflectedType: format,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.SocketRequest = SocketRequest;
/**
 * Injects parameters of the connected socket namespace
 */
function NspParams() {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.NAMESPACE_PARAMS,
            reflectedType: format,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.NspParams = NspParams;
/**
 * Injects named param from the connected socket namespace
 */
function NspParam(name) {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.NAMESPACE_PARAM,
            reflectedType: format,
            value: name,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.NspParam = NspParam;
/**
 * Injects rooms of the connected socket client
 */
function SocketRooms() {
    return function (object, methodName, index) {
        const format = Reflect.getMetadata('design:paramtypes', object, methodName)[index];
        const metadata = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: parameter_type_enum_1.ParameterTypeEnum.SOCKET_ROOMS,
            reflectedType: format,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.parameters.push(metadata);
    };
}
exports.SocketRooms = SocketRooms;
/**
 * Registers a new middleware to be registered in the socket.io
 */
function Middleware(namespace, priority) {
    return function (object) {
        const metadata = {
            target: object,
            namespace: namespace,
            priority: priority,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.middlewares.push(metadata);
    };
}
exports.Middleware = Middleware;
/**
 * If this decorator is set then after controller action will emit message with the given name after action execution
 * It will emit message only if controller succeed without errors
 * If result is a Promise then it will wait until promise is resolved and emit a broadcast message
 */
function EmitNamespaceBroadcastOnSuccess(messageName, options) {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: result_type_enum_1.ResultTypeEnum.EMIT_NAMESPACE_BROADCAST_ON_SUCCESS,
            value: messageName || methodName,
            classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.results.push(metadata);
    };
}
exports.EmitNamespaceBroadcastOnSuccess = EmitNamespaceBroadcastOnSuccess;
/**
 * If this decorator is set then after controller action will emit message with the given name after action execution
 * It will emit message only if controller succeed without errors
 * If result is a Promise then it will wait until promise is resolved and emit a message
 */
function EmitOnSuccess(messageName, options) {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: result_type_enum_1.ResultTypeEnum.EMIT_ON_SUCCESS,
            value: messageName || methodName,
            classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.results.push(metadata);
    };
}
exports.EmitOnSuccess = EmitOnSuccess;
/**
 * If this decorator is set then after controller action will emit message with the given name after action execution
 * It will emit message only if controller throw an exception
 * If result is a Promise then it will wait until promise throw an error and emit a message
 */
function EmitOnFail(messageName, options) {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: result_type_enum_1.ResultTypeEnum.EMIT_ON_FAIL,
            value: messageName || `${methodName}${appointment_config_json_1.default.EVENT.MESSAGE_NAME}`,
            classTransformOptions: options && options.classTransformOptions ? options.classTransformOptions : undefined,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.results.push(metadata);
    };
}
exports.EmitOnFail = EmitOnFail;
/**
 * Used in conjunction with @EmitOnSuccess and @EmitOnFail decorators
 * If result returned by controller action is null or undefined then messages will not be emitted by @EmitOnSuccess
 * or @EmitOnFail decorators
 */
function SkipEmitOnEmptyResult() {
    return function (object, methodName) {
        const metadata = {
            target: object.constructor,
            method: methodName,
            type: result_type_enum_1.ResultTypeEnum.SKIP_EMIT_ON_EMPTY_RESULT,
        };
        storage_arg_util_1.StorageArgUtil.defaultStorage.results.push(metadata);
    };
}
exports.SkipEmitOnEmptyResult = SkipEmitOnEmptyResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3Ivc29ja2V0LmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0QkFBeUI7QUFHekIsZ0dBQWlFO0FBUWpFLG9FQUE4RDtBQUM5RCwwRUFBb0U7QUFDcEUsb0VBQThEO0FBQzlELG1FQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsU0FBa0I7SUFDakQsT0FBTyxVQUFVLE1BQWdCO1FBQy9CLE1BQU0sUUFBUSxHQUEyQjtZQUN2QyxTQUFTLEVBQUUsU0FBUztZQUNwQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUE7UUFFRCxpQ0FBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELENBQUMsQ0FBQTtBQUNILENBQUM7QUFURCw0Q0FTQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLElBQWE7SUFDckMsT0FBTyxVQUFVLE1BQWMsRUFBRSxVQUFrQjtRQUNqRCxNQUFNLFFBQVEsR0FBdUI7WUFDbkMsSUFBSSxFQUFFLElBQUksSUFBSSxVQUFVO1lBQ3hCLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVztZQUMxQixNQUFNLEVBQUUsVUFBVTtZQUNsQixJQUFJLEVBQUUsaUNBQWMsQ0FBQyxPQUFPO1NBQzdCLENBQUE7UUFFRCxpQ0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RELENBQUMsQ0FBQTtBQUNILENBQUM7QUFYRCw4QkFXQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUztJQUN2QixPQUFPLFVBQVUsTUFBYyxFQUFFLFVBQWtCO1FBQ2pELE1BQU0sUUFBUSxHQUF1QjtZQUNuQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsTUFBTSxFQUFFLFVB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