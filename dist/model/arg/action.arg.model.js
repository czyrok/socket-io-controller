"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionArgModel = void 0;
const result_type_enum_1 = require("../../enum/type/result.type.enum");
/**
 * Concrete object of the associate interface
 */
class ActionArgModel {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    constructor(controllerMetadata, args) {
        /**
         * Action's parameters
         */
        this._params = [];
        /**
         * Action's result handlers
         */
        this._results = [];
        this.controller = controllerMetadata;
        if (args.name)
            this.name = args.name;
        this.target = args.target;
        this.method = args.method;
        this.type = args.type;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    executeAction(params) {
        return this.controller.instance[this.method].apply(this.controller.instance, params);
    }
    // -------------------------------------------------------------------------
    // Setters
    // -------------------------------------------------------------------------
    set controller(value) {
        this._controller = value;
    }
    set params(value) {
        this._params = value;
    }
    set results(value) {
        this._results = value;
    }
    set name(value) {
        this._name = value;
    }
    set target(value) {
        this._target = value;
    }
    set method(value) {
        this._method = value;
    }
    set type(value) {
        this._type = value;
    }
    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------
    get controller() {
        return this._controller;
    }
    get params() {
        return this._params;
    }
    get results() {
        return this._results;
    }
    get name() {
        return this._name;
    }
    get target() {
        return this._target;
    }
    get method() {
        return this._method;
    }
    get type() {
        return this._type;
    }
    get emitNamespaceBroadcastOnSuccess() {
        return this.results.find(resultHandler => resultHandler.type === result_type_enum_1.ResultTypeEnum.EMIT_NAMESPACE_BROADCAST_ON_SUCCESS);
    }
    get emitOnSuccess() {
        return this.results.find(resultHandler => resultHandler.type === result_type_enum_1.ResultTypeEnum.EMIT_ON_SUCCESS);
    }
    get emitOnFail() {
        return this.results.find(resultHandler => resultHandler.type === result_type_enum_1.ResultTypeEnum.EMIT_ON_FAIL);
    }
    get skipEmitOnEmptyResult() {
        return this.results.find(resultHandler => resultHandler.type === result_type_enum_1.ResultTypeEnum.SKIP_EMIT_ON_EMPTY_RESULT);
    }
}
exports.ActionArgModel = ActionArgModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmFyZy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9hcmcvYWN0aW9uLmFyZy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSx1RUFBaUU7QUFFakU7O0dBRUc7QUFDSCxNQUFhLGNBQWM7SUF5Q3pCLDRFQUE0RTtJQUM1RSxpQkFBaUI7SUFDakIsNEVBQTRFO0lBRTVFLFlBQVksa0JBQXNDLEVBQUUsSUFBd0I7UUFuQzVFOztXQUVHO1FBQ0ssWUFBTyxHQUE2QixFQUFFLENBQUE7UUFFOUM7O1dBRUc7UUFDSyxhQUFRLEdBQTBCLEVBQUUsQ0FBQTtRQTRCMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQTtRQUVwQyxJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBRXBDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsaUJBQWlCO0lBQ2pCLDRFQUE0RTtJQUVyRSxhQUFhLENBQUMsTUFBa0I7UUFDckMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3RGLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsVUFBVTtJQUNWLDRFQUE0RTtJQUU1RSxJQUFXLFVBQVUsQ0FBQyxLQUF5QjtRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtJQUMxQixDQUFDO0lBRUQsSUFBVyxNQUFNLENBQUMsS0FBK0I7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsT0FBTyxDQUFDLEtBQTRCO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLElBQUksQ0FBQyxLQUFhO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFXLE1BQU0sQ0FBQyxLQUFlO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFXLE1BQU0sQ0FBQyxLQUFhO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFXLElBQUksQ0FBQyxLQUFxQjtRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNwQixDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLFVBQVU7SUFDViw0RUFBNEU7SUFFNUUsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVELElBQVcsK0JBQStCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLGlDQUFjLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtJQUN0SCxDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLGlDQUFjLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDbEcsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxpQ0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQy9GLENBQUM7SUFFRCxJQUFXLHFCQUFxQjtRQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxpQ0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUE7SUFDNUcsQ0FBQztDQUNGO0FBOUlELHdDQThJQyJ9