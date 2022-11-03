/**
 * Caused when an error arises about the socket
 */
export declare class ServerError extends Error {
    /**
     * HTTP error code associate to the error
     */
    private _httpErrorCode;
    constructor(httpErrorCode: number, desc: string);
    private set httpErrorCode(value);
    get httpErrorCode(): number;
}
