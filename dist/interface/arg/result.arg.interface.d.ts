import { ClassTransformOptions } from 'class-transformer';
import { ResultTypeEnum } from '../../enum/type/result.type.enum';
/**
 * Metadata used to storage information about registered result
 */
export interface ResultArgInterface {
    /**
     * Result target
     */
    target: Function;
    /**
     * Method on which's result is attached
     */
    method: string;
    /**
     * Result type
     */
    type: ResultTypeEnum;
    /**
     * Class transform options used to perform plainToClass operation
     */
    classTransformOptions?: ClassTransformOptions;
    /**
     * Extra parameter value
     */
    value?: string;
}
