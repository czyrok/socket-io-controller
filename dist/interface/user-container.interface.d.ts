/**
 * Container options
 */
export interface UserContainerInterface {
    /**
     * If set to true, then default container will be used in the case if given container haven't returned anything
     */
    fallback?: boolean;
    /**
     * If set to true, then default container will be used in the case if given container thrown an exception
     */
    fallbackOnErrors?: boolean;
}
