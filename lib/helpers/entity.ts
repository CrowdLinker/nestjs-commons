import get from 'lodash/get';
import {
  ModelEntity,
  ModelEntity as BaseModelEntity,
} from '../serializers/model';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import { ReadableModelEntity } from '../serializers/entities/readable-model';

interface SetEntityVariableValuesFunctionParameter {
  variablesToAssign?: string[];
  booleans?: string[];
  integers?: string[];
  floats?: string[];
  enums?: Record<string, Record<string, string | number>>;
  oneToManyRelations?: Record<string, typeof BaseModelEntity>;
  manyToOneRelations?: Record<string, typeof BaseModelEntity>;
  manyToManyRelations?: Record<string, typeof BaseModelEntity>;
}

/**
 * Sets "id" variable value for an entity.
 *
 * @param {T} classToSerialize
 * @param {Parial<T>} partial
 */
export const setEntityId = <T extends ModelEntity>(
  classToSerialize: T,
  partial: Partial<T>,
) => {
  Object.assign(classToSerialize, { id: partial['id'] });
};

/**
 * Sets "readableId" variable value for an entity.
 *
 * @param {T} classToSerialize
 * @param {Parial<T>} partial
 */
export const setEntityReadableId = <T extends ReadableModelEntity>(
  classToSerialize: T,
  partial: Partial<T>,
) => {
  partial['readableId'] =
    isString(partial['readableId']) || isNumber(partial['readableId'])
      ? parseInt(partial['readableId'] as any)
      : null;

  Object.assign(classToSerialize, { readableId: partial['readableId'] });
};

/**
 * Sets variable values as per "variables.variablesToAssign" for an entity.
 *
 * @param {T} classToSerialize
 * @param {Partial<T>} partial
 * @param {SetEntityVariableValuesFunctionParameter} variables
 */
export const setEntityVariableValues = <T extends ModelEntity>(
  classToSerialize: T,
  partial: Partial<ModelEntity>,
  variables: SetEntityVariableValuesFunctionParameter,
) => {
  const variablesToAssign: SetEntityVariableValuesFunctionParameter['variablesToAssign'] =
    get(variables, 'variablesToAssign', []);
  const booleans = get(variables, 'booleans', []);
  const integers = get(variables, 'integers', []);
  const floats = get(variables, 'floats', []);
  const enums = get(variables, 'enums', {});
  const manyToOneRelations = get(variables, 'manyToOneRelations', {});
  const oneToManyRelations = get(variables, 'oneToManyRelations', {});
  const manyToManyRelations = get(variables, 'manyToManyRelations', {});

  /**
   * Set integer based values for the entity.
   *
   * @param {Partial<ModelEntity>} partial
   * @param {SetEntityVariableValuesFunctionParameter['integers']} integers
   * @param {string} currentVariable
   */
  const setIntegerValueInLoop = (
    partial: Partial<ModelEntity>,
    integers: SetEntityVariableValuesFunctionParameter['integers'],
    currentVariable: string,
  ) => {
    if (
      !isEmpty(integers) &&
      isArray(integers) &&
      integers.includes(currentVariable)
    ) {
      partial[currentVariable] =
        isString(partial[currentVariable]) || isNumber(partial[currentVariable])
          ? parseInt(partial[currentVariable])
          : null;
    }
  };

  /**
   * Set float based values for the entity.
   *
   * @param {Partial<ModelEntity>} partial
   * @param {SetEntityVariableValuesFunctionParameter['floats']} integers
   * @param {string} currentVariable
   */
  const setFloatValueInLoop = (
    partial: Partial<ModelEntity>,
    floats: SetEntityVariableValuesFunctionParameter['floats'],
    currentVariable: string,
  ) => {
    if (
      !isEmpty(floats) &&
      isArray(floats) &&
      floats.includes(currentVariable)
    ) {
      partial[currentVariable] =
        isString(partial[currentVariable]) || isNumber(partial[currentVariable])
          ? parseFloat(partial[currentVariable])
          : null;
    }
  };

  /**
   * Set enum based values for the entity.
   *
   * @param {Partial<ModelEntity>} partial
   * @param {SetEntityVariableValuesFunctionParameter['enums']} enums
   * @param {string} currentVariable
   */
  const setEnumValueInLoop = (
    partial: Partial<ModelEntity>,
    enums: SetEntityVariableValuesFunctionParameter['enums'],
    currentVariable: string,
  ) => {
    if (
      !isEmpty(enums) &&
      isObject(enums) &&
      keys(enums).includes(currentVariable)
    ) {
      partial[currentVariable] = partial[currentVariable]
        ? enums[currentVariable][partial[currentVariable]]
        : null;
    }
  };

  /**
   * Set one to many relation based values for the entity.
   *
   * @param {Partial<ModelEntity>} partial
   * @param {SetEntityVariableValuesFunctionParameter['oneToManyRelations']} oneToManyRelations
   * @param {string} currentVariable
   */
  const setOneToManyRelationValueInLoop = (
    partial: Partial<ModelEntity>,
    oneToManyRelations: SetEntityVariableValuesFunctionParameter['oneToManyRelations'],
    currentVariable: string,
  ) => {
    if (
      !isEmpty(oneToManyRelations) &&
      isObject(oneToManyRelations) &&
      keys(oneToManyRelations).includes(currentVariable)
    ) {
      const Entity = oneToManyRelations[currentVariable];
      partial[currentVariable] = Array.isArray(partial[currentVariable])
        ? partial[currentVariable].map((value) => new Entity(value))
        : [];
    }
  };

  /**
   * Set many to one relation based values for the entity.
   *
   * @param {Partial<ModelEntity>} partial
   * @param {SetEntityVariableValuesFunctionParameter['manyToOneRelations']} manyToOneRelations
   * @param {string} currentVariable
   */
  const setManyToOneRelationValueInLoop = (
    partial: Partial<ModelEntity>,
    manyToOneRelations: SetEntityVariableValuesFunctionParameter['manyToOneRelations'],
    currentVariable: string,
  ) => {
    if (
      !isEmpty(manyToOneRelations) &&
      isObject(manyToOneRelations) &&
      keys(manyToOneRelations).includes(currentVariable)
    ) {
      const Entity = manyToOneRelations[currentVariable];

      partial[currentVariable] = partial[currentVariable]
        ? new Entity(partial[currentVariable])
        : null;
    }
  };

  /**
   * Set many to many relation based values for the entity.
   *
   * @param {Partial<ModelEntity>} partial
   * @param {SetEntityVariableValuesFunctionParameter['manyToManyRelations']} manyToOneRelations
   * @param {string} currentVariable
   */
  const setManyToManyRelationValueInLoop = (
    partial: Partial<ModelEntity>,
    manyToManyRelations: SetEntityVariableValuesFunctionParameter['manyToManyRelations'],
    currentVariable: string,
  ) => {
    setOneToManyRelationValueInLoop(
      partial,
      manyToManyRelations,
      currentVariable,
    );
  };

  variablesToAssign.forEach((variable) => {
    if (
      !partial[variable] &&
      !floats.includes(variable) &&
      !integers.includes(variable) &&
      !booleans.includes(variable) &&
      !keys(enums).includes(variable) &&
      !keys(oneToManyRelations).includes(variable) &&
      !keys(manyToOneRelations).includes(variable) &&
      !keys(manyToManyRelations).includes(variable)
    ) {
      partial[variable] = null;
    }

    setEnumValueInLoop(partial, enums, variable);

    setFloatValueInLoop(partial, floats, variable);

    setIntegerValueInLoop(partial, integers, variable);

    setManyToOneRelationValueInLoop(partial, manyToOneRelations, variable);

    setOneToManyRelationValueInLoop(partial, oneToManyRelations, variable);

    setManyToManyRelationValueInLoop(partial, manyToManyRelations, variable);

    Object.assign(classToSerialize, { [variable]: partial[variable] });
  });
};
