import { Socket } from 'socket.io'

export interface MiddlewareInterface {
    type: 'MiddlewareInterface'

    use(socket: Socket, next: (err?: any) => any): any
}