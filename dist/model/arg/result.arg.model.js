"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultArgModel = void 0;
/**
 * Concrete object of the associate interface
 */
class ResultArgModel {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    constructor(action, args) {
        this.action = action;
        this.target = args.target;
        this.method = args.method;
        this.type = args.type;
        if (args.classTransformOptions)
            this.classTransformOptions = args.classTransformOptions;
        if (args.value)
            this.value = args.value;
    }
    // -------------------------------------------------------------------------
    // Setters
    // -------------------------------------------------------------------------
    set action(value) {
        this._action = value;
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
    set classTransformOptions(value) {
        this._classTransformOptions = value;
    }
    set value(value) {
        this._value = value;
    }
    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------
    get action() {
        return this._action;
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
    get classTransformOptions() {
        return this._classTransformOptions;
    }
    get value() {
        return this._value;
    }
}
exports.ResultArgModel = ResultArgModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmFyZy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9hcmcvcmVzdWx0LmFyZy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFRQTs7R0FFRztBQUNILE1BQWEsY0FBYztJQW1DekIsNEVBQTRFO0lBQzVFLGlCQUFpQjtJQUNqQiw0RUFBNEU7SUFFNUUsWUFBWSxNQUFzQixFQUFFLElBQXdCO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBRXJCLElBQUksSUFBSSxDQUFDLHFCQUFxQjtZQUFFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUE7UUFDdkYsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUN6QyxDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLFVBQVU7SUFDViw0RUFBNEU7SUFFNUUsSUFBVyxNQUFNLENBQUMsS0FBcUI7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQXFCO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFXLHFCQUFxQixDQUFDLEtBQTRCO1FBQzNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUE7SUFDckMsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDckIsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxVQUFVO0lBQ1YsNEVBQTRFO0lBRTVFLElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRUQsSUFBVyxxQkFBcUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUE7SUFDcEMsQ0FBQztJQUVELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUF4R0Qsd0NBd0dDIn0=