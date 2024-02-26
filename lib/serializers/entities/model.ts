import { setEntityId } from '../../helpers/entity';
import { ModelEntity as BaseModelEntity } from '../model';

/**
 * Base model entity used for serializing entities with "id" column.
 *
 * @abstract
 * @class
 *
 * @extends {ModelEntity}
 */
export abstract class ModelEntity extends BaseModelEntity {
  id!: string;

  constructor(partial: Partial<ModelEntity>) {
    super();

    setEntityId(this, partial);
  }
}
