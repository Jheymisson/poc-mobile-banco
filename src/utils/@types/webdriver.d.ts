declare type ExtendedConfig = {
  deprecationWarnings: boolean;
  cucumberOpts: Record<string, any>;
};

declare type ExtendedCapabilities = {
  'appium:app': string;
};

declare type SauceLabsCapabilities = {
  testobject_app_id: string;
  testobject_test_name: string;
  idleTimeout: number;
  phoneOnly: boolean;
  tabletOnly: boolean;
  testobject_cache_device?: boolean;
  testobject_api_key?: string;
};
