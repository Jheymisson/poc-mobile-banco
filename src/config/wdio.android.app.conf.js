const { join } = require('path');
const { config } = require('./wdio.shared.conf');

// ============
// Specs
// ============
config.cucumberOpts.require = ['./src/steps/**/app*.steps.ts'];

config.capabilities = [
  {
    platformName: 'Android',
    automationName: 'UiAutomator2',
    deviceName: 'emulator-5554',
    appPackage: '',
    orientation: 'PORTRAIT',
    autoGrantPermissions: true,
    noReset: true,
    appWaitActivity: '',
    appActivity: '',

    app: join(process.cwd(), './apps/app-release.apk'),
  },
];

exports.config = config;
