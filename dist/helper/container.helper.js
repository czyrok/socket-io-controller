"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerHelper = void 0;
/**
 * Helper to load exported classes
 */
class ContainerHelper {
    /**
     * Sets container to be used by this library
     */
    static useContainer(iocContainer, options) {
        this.userContainer = iocContainer;
        if (options)
            this.userContainerOptions = options;
    }
    /**
     * Gets the IOC container used by this library
     */
    static getFromContainer(someClass) {
        if (this.userContainer) {
            try {
                const instance = this.userContainer.get(someClass);
                if (instance)
                    return instance;
                if (!this.userContainerOptions || !this.userContainerOptions.fallback)
                    return instance;
            }
            catch (error) {
                if (!this.userContainerOptions || !this.userContainerOptions.fallbackOnErrors)
                    throw error;
            }
        }
        return this.defaultContainer.get(someClass);
    }
}
exports.ContainerHelper = ContainerHelper;
// -------------------------------------------------------------------------
// Public Methods
// -------------------------------------------------------------------------
/**
* Container to be used by this library for inversion control
* If container was not implicitly set then by default
* container simply creates a new instance of the given class
*/
ContainerHelper.defaultContainer = new (class {
    constructor() {
        this.instances = [];
    }
    get(someClass) {
        let instance = this.instances.find(instance => instance.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }
        return instance.object;
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXIvY29udGFpbmVyLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTs7R0FFRztBQUNILE1BQWEsZUFBZTtJQXFDeEI7O09BRUc7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQTBDLEVBQUUsT0FBZ0M7UUFDbkcsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFFakMsSUFBSSxPQUFPO1lBQUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQTtJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUksU0FBZ0Q7UUFDOUUsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUk7Z0JBQ0EsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ2xELElBQUksUUFBUTtvQkFBRSxPQUFPLFFBQVEsQ0FBQTtnQkFFN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRO29CQUFFLE9BQU8sUUFBUSxDQUFBO2FBQ3pGO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0I7b0JBQUUsTUFBTSxLQUFLLENBQUE7YUFDN0Y7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBSSxTQUFTLENBQUMsQ0FBQTtJQUNsRCxDQUFDOztBQTdETCwwQ0E4REM7QUEvQ0csNEVBQTRFO0FBQzVFLGlCQUFpQjtBQUNqQiw0RUFBNEU7QUFFNUU7Ozs7RUFJRTtBQUNhLGdDQUFnQixHQUFvRSxJQUFJLENBQUM7SUFBQTtRQUM1RixjQUFTLEdBQXNDLEVBQUUsQ0FBQTtJQVU3RCxDQUFDO0lBVEcsR0FBRyxDQUFJLFNBQXFDO1FBQ3hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQTtRQUMzRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsUUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxTQUFTLEVBQUUsRUFBRSxDQUFBO1lBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ2hDO1FBRUQsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQzFCLENBQUM7Q0FDSixDQUFDLEVBQUUsQ0FBQSJ9