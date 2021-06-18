import { InputInterface } from './inputs';

/**
 * Search input variable type declaration.
 *
 * @interface
 *
 * @extends {InputInterface}
 */
export interface SearchInputInterface extends InputInterface {
  search?: string;
}
