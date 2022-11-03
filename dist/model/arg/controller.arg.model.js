"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerArgModel = void 0;
const container_helper_1 = require("../../helper/container.helper");
/**
 * Concrete object of the associate interface
 */
class ControllerArgModel {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(args) {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        /**
         * Controller actions
         */
        this._actions = [];
        this.target = args.target;
        if (args.namespace)
            this.namespace = args.namespace;
    }
    // -------------------------------------------------------------------------
    // Setters
    // -------------------------------------------------------------------------
    set actions(value) {
        this._actions = value;
    }
    set target(value) {
        this._target = value;
    }
    set namespace(value) {
        this._namespace = value;
    }
    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------
    get actions() {
        return this._actions;
    }
    get target() {
        return this._target;
    }
    get namespace() {
        return this._namespace;
    }
    get instance() {
        return container_helper_1.ContainerHelper.getFromContainer(this.target);
    }
}
exports.ControllerArgModel = ControllerArgModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5hcmcubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvYXJnL2NvbnRyb2xsZXIuYXJnLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUErRDtBQU0vRDs7R0FFRztBQUNILE1BQWEsa0JBQWtCO0lBb0I3Qiw0RUFBNEU7SUFDNUUsY0FBYztJQUNkLDRFQUE0RTtJQUU1RSxZQUFZLElBQTRCO1FBdkJ4Qyw0RUFBNEU7UUFDNUUsYUFBYTtRQUNiLDRFQUE0RTtRQUU1RTs7V0FFRztRQUNLLGFBQVEsR0FBMEIsRUFBRSxDQUFBO1FBaUIxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFFekIsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLFVBQVU7SUFDViw0RUFBNEU7SUFFNUUsSUFBVyxPQUFPLENBQUMsS0FBNEI7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7SUFDdkIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEtBQWU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsU0FBUyxDQUFDLEtBQWE7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7SUFDekIsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSxVQUFVO0lBQ1YsNEVBQTRFO0lBRTVFLElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sa0NBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEQsQ0FBQztDQUNGO0FBakVELGdEQWlFQyJ9