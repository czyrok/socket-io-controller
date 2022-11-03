export * from './decorator/socket.decorator';
export * from './helper/using.helper';
export * from './helper/container.helper';
export * from './error/server.error';
export * from './error/parse-json.socket.error';
export * from './model/socket-executor.model';
export * from './interface/middleware.interface';

declare module "socket-io-controller" {
    function SocketController(namespace?: string): Function;
}
