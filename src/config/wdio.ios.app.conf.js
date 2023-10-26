const { join } = require('path');
const { config } = require('./wdio.shared.conf');

// ============
// Specs
// ============
config.cucumberOpts.require = ['./src/steps/**/app*.steps.ts'];

// ============
// Capabilities
// ============

config.capabilities = [
  {
    platformName: 'iOS',
    maxInstances: 1,
    deviceName: 'iPhone 8',
    platformVersion: '14.3',
    orientation: 'PORTRAIT',
    autoDismissAlerts: true,
    autoAcceptAlerts: true,
    automationName: 'XCUITest',
    'appium:app': join(process.cwd(), './apps/template_ios.app'),
  },
];

exports.config = config;
