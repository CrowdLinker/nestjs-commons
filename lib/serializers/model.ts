/**
 * Model entity used for serializing response data.
 *
 * @class
 */
export class ModelEntity {
  [key: string]: any;

  constructor(partial?: Partial<ModelEntity>) {
    if (!partial) {
      return;
    }
  }
}
