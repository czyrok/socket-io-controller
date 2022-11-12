import { GetInstanceSocketError } from '../error/get-instance.socket.error'

import { UserContainerInterface } from '../interface/user-container.interface'

/**
 * Helper to load exported classes
 */
export class ContainerHelper {
    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    /**
    * Default container set by user
    */
    private static userContainer: { get<T>(someClass: { new(...args: any[]): T } | Function): T }

    /**
    * Options for default container set by user
    */
    private static userContainerOptions: UserContainerInterface

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
    * Container to be used by this library for inversion control
    * If container was not implicitly set then by default
    * container simply creates a new instance of the given class
    */
    private static defaultContainer: { get<T>(someClass: { new(...args: any[]): T } | Function): T } = new (class {
        private instances: { type: Function, object: any }[] = []

        get<T>(someClass: { new(...args: any[]): T }): T {
            let instance = this.instances.find(instance => instance.type === someClass)

            if (!instance) {
                instance = { type: someClass, object: new someClass() }
                this.instances.push(instance)
            }

            return instance.object
        }
    })()

    /**
     * Sets container to be used by this library
     */
    public static useContainer(iocContainer: { get(someClass: any): any }, options?: UserContainerInterface) {
        this.userContainer = iocContainer

        if (options) this.userContainerOptions = options
    }

    /**
     * Gets the IOC container used by this library
     */
    public static getFromContainer<T>(someClass: { new(...args: any[]): T } | Function): T {
        if (this.userContainer) {
            try {
                const instance = this.userContainer.get(someClass)

                if (instance) return instance

                if (!this.userContainerOptions || !this.userContainerOptions.fallback) return instance
            } catch (error) {
                if (!this.userContainerOptions || !this.userContainerOptions.fallbackOnErrors) throw new GetInstanceSocketError()
            }
        }

        return this.defaultContainer.get<T>(someClass)
    }
}