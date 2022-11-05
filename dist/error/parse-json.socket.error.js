"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseJsonSocketError = void 0;
const server_error_1 = require("./server.error");
const error_code_config_json_1 = __importDefault(require("../config/error-code.config.json"));
/**
 * Caused when user parameter is given, but is invalid and cannot be parsed
 */
class ParseJsonSocketError extends server_error_1.ServerError {
    constructor() {
        super(error_code_config_json_1.default.JSON_PARSE_ERROR, 'User parameter cannot be parsed to JSON');
    }
}
exports.ParseJsonSocketError = ParseJsonSocketError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtanNvbi5zb2NrZXQuZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3IvcGFyc2UtanNvbi5zb2NrZXQuZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaURBQTRDO0FBRTVDLDhGQUE4RDtBQUU5RDs7R0FFRztBQUNILE1BQWEsb0JBQXFCLFNBQVEsMEJBQVc7SUFDbkQ7UUFDRSxLQUFLLENBQUMsZ0NBQWUsQ0FBQyxnQkFBZ0IsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFBO0lBQ3BGLENBQUM7Q0FDRjtBQUpELG9EQUlDIn0=