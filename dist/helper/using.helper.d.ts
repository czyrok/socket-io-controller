import { Server } from 'socket.io';
import { SettingInterface } from '../interface/setting.interface';
/**
 * Helper to load use this library
 */
export declare class UsingHelper {
    /**
     * Create an executor to the socket server and return them
     */
    static useSocketServer(io: Server, options?: SettingInterface): Server;
    /**
     * Create an executor to the socket server
     */
    private static createExecutor;
}
