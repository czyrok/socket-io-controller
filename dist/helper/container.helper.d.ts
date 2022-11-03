import { UserContainerInterface } from '../interface/user-container.interface';
/**
 * Helper to load exported classes
 */
export declare class ContainerHelper {
    /**
    * Default container set by user
    */
    private static userContainer;
    /**
    * Options for default container set by user
    */
    private static userContainerOptions;
    /**
    * Container to be used by this library for inversion control
    * If container was not implicitly set then by default
    * container simply creates a new instance of the given class
    */
    private static defaultContainer;
    /**
     * Sets container to be used by this library
     */
    static useContainer(iocContainer: {
        get(someClass: any): any;
    }, options?: UserContainerInterface): void;
    /**
     * Gets the IOC container used by this library
     */
    static getFromContainer<T>(someClass: {
        new (...args: any[]): T;
    } | Function): T;
}
