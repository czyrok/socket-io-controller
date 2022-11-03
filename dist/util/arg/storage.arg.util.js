"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageArgUtil = void 0;
/**
 * Storage all metadatas read from decorators
 */
class StorageArgUtil {
    constructor() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        /**
         * Saved controllers
         */
        this._controllers = [];
        /**
         * Saved middlewares
         */
        this._middlewares = [];
        /**
         * Saved actions
         */
        this._actions = [];
        /**
         * Saved results
         */
        this._results = [];
        /**
         * Saved parameters
         */
        this._parameters = [];
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Find controllers for classes
     */
    findControllersForClasses(classes) {
        return this.controllers.filter(ctrl => {
            return classes.filter(cls => ctrl.target === cls).length > 0;
        });
    }
    /**
     * Find middlewares for classes
     */
    findMiddlewaresForClasses(classes) {
        return this.middlewares.filter(middleware => {
            return classes.filter(cls => middleware.target === cls).length > 0;
        });
    }
    /**
     * Find actions with target
     */
    findActionsWithTarget(target) {
        return this.actions.filter(action => action.target === target);
    }
    /**
     * Find results with target and method name
     */
    findResultsWithTargetAndMethod(target, methodName) {
        return this.results.filter(result => {
            return result.target === target && result.method === methodName;
        });
    }
    /**
     * Find parameters with target and method name
     */
    findParametersWithTargetAndMethod(target, methodName) {
        return this.parameters.filter(parameter => {
            return parameter.target === target && parameter.method === methodName;
        });
    }
    /**
     * Removes all saved metadata
     */
    reset() {
        this.controllers = [];
        this.middlewares = [];
        this.actions = [];
        this.results = [];
        this.parameters = [];
    }
    // -------------------------------------------------------------------------
    // Setters
    // -------------------------------------------------------------------------
    set controllers(value) {
        this._controllers = value;
    }
    set middlewares(value) {
        this._middlewares = value;
    }
    set actions(value) {
        this._actions = value;
    }
    set results(value) {
        this._results = value;
    }
    set parameters(value) {
        this._parameters = value;
    }
    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------
    get controllers() {
        return this._controllers;
    }
    get middlewares() {
        return this._middlewares;
    }
    get actions() {
        return this._actions;
    }
    get results() {
        return this._results;
    }
    get parameters() {
        return this._parameters;
    }
    static get defaultStorage() {
        if (!global.socketControllersMetadataArgsStorage)
            global.socketControllersMetadataArgsStorage = new StorageArgUtil();
        return global.socketControllersMetadataArgsStorage;
    }
}
exports.StorageArgUtil = StorageArgUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5hcmcudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL2FyZy9zdG9yYWdlLmFyZy51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU9BOztHQUVHO0FBQ0gsTUFBYSxjQUFjO0lBQTNCO1FBQ0UsNEVBQTRFO1FBQzVFLGFBQWE7UUFDYiw0RUFBNEU7UUFFNUU7O1dBRUc7UUFDSyxpQkFBWSxHQUFrQyxFQUFFLENBQUE7UUFFeEQ7O1dBRUc7UUFDSyxpQkFBWSxHQUFrQyxFQUFFLENBQUE7UUFFeEQ7O1dBRUc7UUFDSyxhQUFRLEdBQThCLEVBQUUsQ0FBQTtRQUVoRDs7V0FFRztRQUNLLGFBQVEsR0FBOEIsRUFBRSxDQUFBO1FBRWhEOztXQUVHO1FBQ0ssZ0JBQVcsR0FBaUMsRUFBRSxDQUFBO0lBa0h4RCxDQUFDO0lBaEhDLDRFQUE0RTtJQUM1RSxpQkFBaUI7SUFDakIsNEVBQTRFO0lBRTVFOztPQUVHO0lBQ0kseUJBQXlCLENBQUMsT0FBd0I7UUFDdkQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFDOUQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSx5QkFBeUIsQ0FBQyxPQUF3QjtRQUN2RCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUNwRSxDQUFDLENBQUMsQ0FBQTtJQUNK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