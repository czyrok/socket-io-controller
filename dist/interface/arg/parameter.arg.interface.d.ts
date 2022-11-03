import { ClassTransformOptions } from 'class-transformer';
import { Socket } from 'socket.io';
import { ParameterTypeEnum } from '../../enum/type/parameter.type.enum';
/**
 * Metadata used to storage information about registered parameter
 */
export interface ParameterArgInterface {
    /**
     * Parameter target
     */
    target: Function;
    /**
     * Method on which's parameter is attached
     */
    method: string;
    /**
     * Index (# number) of the parameter in the method signature
     */
    index: number;
    /**
     * Parameter type
     */
    type: ParameterTypeEnum;
    /**
     * Reflected type of the parameter
     */
    reflectedType: any;
    /**
     * Transforms the value
     */
    transform?: (value: any, socket: Socket) => Promise<any> | any;
    /**
     * Class transform options used to perform plainToClass operation
     */
    classTransformOptions?: ClassTransformOptions;
    /**
     * Extra parameter value
     */
    value?: string;
}
