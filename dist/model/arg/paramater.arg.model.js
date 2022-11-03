"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterArgModel = void 0;
/**
 * Concrete object of the associate interface
 */
class ParameterArgModel {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    constructor(action, args) {
        this.action = action;
        this.target = args.target;
        this.method = args.method;
        this.reflectedType = args.reflectedType;
        this.index = args.index;
        this.type = args.type;
        if (args.transform)
            this.transform = args.transform;
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
    set index(value) {
        this._index = value;
    }
    set type(value) {
        this._type = value;
    }
    set value(value) {
        this._value = value;
    }
    set reflectedType(value) {
        this._reflectedType = value;
    }
    set transform(value) {
        this._transform = value;
    }
    set classTransformOptions(value) {
        this._classTransformOptions = value;
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
    get index() {
        return this._index;
    }
    get type() {
        return this._type;
    }
    get value() {
        return this._value;
    }
    get reflectedType() {
        return this._reflectedType;
    }
    get transform() {
        return this._transform;
    }
    get classTransformOptions() {
        return this._classTransformOptions;
    }
}
exports.ParameterArgModel = ParameterArgModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1hdGVyLmFyZy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9hcmcvcGFyYW1hdGVyLmFyZy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTQTs7R0FFRztBQUNILE1BQWEsaUJBQWlCO0lBa0Q1Qiw0RUFBNEU7SUFDNUUsaUJBQWlCO0lBQ2pCLDRFQUE0RTtJQUU1RSxZQUFZLE1BQXNCLEVBQUUsSUFBMkI7UUFDN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUVyQixJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBQ25ELElBQUksSUFBSSxDQUFDLHFCQUFxQjtZQUFFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUE7UUFDdkYsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUN6QyxDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLFVBQVU7SUFDViw0RUFBNEU7SUFFNUUsSUFBVyxNQUFNLENBQUMsS0FBcUI7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDckIsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQXdCO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFXLGFBQWEsQ0FBQyxLQUFVO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFBO0lBQzdCLENBQUM7SUFFRCxJQUFXLFNBQVMsQ0FBQyxLQUF5RDtRQUM1RSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBVyxxQkFBcUIsQ0FBQyxLQUE0QjtRQUMzRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFBO0lBQ3JDLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsVUFBVTtJQUNWLDRFQUE0RTtJQUU1RSxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO0lBQzVCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFXLHFCQUFxQjtRQUM5QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQTtJQUNwQyxDQUFDO0NBQ0Y7QUFsSkQsOENBa0pDIn0=