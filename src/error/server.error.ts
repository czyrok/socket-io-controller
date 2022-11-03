/**
 * Caused when an error arises about the socket
 */
export class ServerError extends Error {
    /**
     * HTTP error code associate to the error
     */
    private _httpErrorCode: number = -1

    constructor(httpErrorCode: number, desc: string) {
        super(desc)

        this.httpErrorCode = httpErrorCode
    }

    private set httpErrorCode(value: number) {
        this._httpErrorCode = value
    }

    public get httpErrorCode(): number {
        return this._httpErrorCode
    }
}