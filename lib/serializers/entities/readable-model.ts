import { ModelEntity } from './model';
import { setEntityReadableId } from '../../helpers/entity';

/**
 * Base readable model entity used for serializing entities with "readableId" column.
 *
 * @abstract
 * @class
 *
 * @extends {ModelEntity}
 */
export abstract class ReadableModelEntity extends ModelEntity {
  readableId!: number;

  constructor(partial: Partial<ReadableModelEntity>) {
    super(partial);

    setEntityReadableId(this, partial);
  }
}
