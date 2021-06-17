/**
 * App environment config variable type declaration.
 *
 * @interface
 *
 * @type Object
 */
export interface AppConfig {
  env: string;
  name: string;
  port: number;
  url: string;
}

/**
 * AppConfigService type declaration.
 *
 * @interface
 */
export interface AppConfigServiceInterface {
  isProductionEnv: () => boolean;
  name: string;
  env: string;
  url: string;
  port: number;
  all: AppConfig;
}
