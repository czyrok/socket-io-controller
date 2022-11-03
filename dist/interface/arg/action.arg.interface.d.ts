import { ActionTypeEnum } from '../../enum/type/action.type.enum';
/**
 * Metadata used to storage information about registered action
 */
export interface ActionArgInterface {
    /**
     * Message's name to listen to
     */
    name?: string;
    /**
     * Class on which's method this action is attached
     */
    target: Function;
    /**
     * Object's method that will be executed on this action
     */
    method: string;
    /**
     * Action type
     */
    type: ActionTypeEnum;
}
