"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareArgModel = void 0;
const container_helper_1 = require("../../helper/container.helper");
/**
 * Concrete object of the associate interface
 */
class MiddlewareArgModel {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(args) {
        this.target = args.target;
        if (args.namespace)
            this.namespace = args.namespace;
        this.priority = args.priority || 0;
    }
    // -------------------------------------------------------------------------
    // Setters
    // -------------------------------------------------------------------------
    set target(value) {
        this._target = value;
    }
    set namespace(value) {
        this._namespace = value;
    }
    set priority(value) {
        this._priority = value;
    }
    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------
    get target() {
        return this._target;
    }
    get namespace() {
        return this._namespace;
    }
    get priority() {
        return this._priority;
    }
    get instance() {
        return container_helper_1.ContainerHelper.getFromContainer(this.target);
    }
}
exports.MiddlewareArgModel = MiddlewareArgModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5hcmcubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvYXJnL21pZGRsZXdhcmUuYXJnLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUErRDtBQUkvRDs7R0FFRztBQUNILE1BQWEsa0JBQWtCO0lBb0I3Qiw0RUFBNEU7SUFDNUUsY0FBYztJQUNkLDRFQUE0RTtJQUU1RSxZQUFZLElBQTRCO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUV6QixJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBRW5ELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxVQUFVO0lBQ1YsNEVBQTRFO0lBRTVFLElBQVcsTUFBTSxDQUFDLEtBQWU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsU0FBUyxDQUFDLEtBQWE7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7SUFDekIsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7SUFDeEIsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxVQUFVO0lBQ1YsNEVBQTRFO0lBRTVFLElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQTtJQUN2QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sa0NBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEQsQ0FBQztDQUNGO0FBbkVELGdEQW1FQyJ9