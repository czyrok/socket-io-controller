"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
/**
 * Caused when an error arises about the socket
 */
class ServerError extends Error {
    constructor(httpErrorCode, desc) {
        super(desc);
        /**
         * HTTP error code associate to the error
         */
        this._httpErrorCode = -1;
        this.httpErrorCode = httpErrorCode;
    }
    set httpErrorCode(value) {
        this._httpErrorCode = value;
    }
    get httpErrorCode() {
        return this._httpErrorCode;
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9yL3NlcnZlci5lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILE1BQWEsV0FBWSxTQUFRLEtBQUs7SUFNbEMsWUFBWSxhQUFxQixFQUFFLElBQVk7UUFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBTmY7O1dBRUc7UUFDSyxtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFBO1FBSy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFBO0lBQ3RDLENBQUM7SUFFRCxJQUFZLGFBQWEsQ0FBQyxLQUFhO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFBO0lBQy9CLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO0lBQzlCLENBQUM7Q0FDSjtBQW5CRCxrQ0FtQkMifQ==