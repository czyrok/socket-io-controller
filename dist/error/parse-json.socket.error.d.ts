import { ServerError } from './server.error';
/**
 * Caused when user parameter is given, but is invalid and cannot be parsed
 */
export declare class ParseJsonSocketError extends ServerError {
    constructor();
}
