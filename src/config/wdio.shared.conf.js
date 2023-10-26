const { ReportAggregator } = require('wdio-html-nice-reporter');

exports.config = {
  // ====================
  // Runner and framework
  // Configuration
  // ====================
  runner: 'local',
  framework: 'cucumber',
  logLevel: 'info',
  path: '/wd/hub',
  deprecationWarnings: true,
  bail: 0,
  waitforTimeout: 20000000,
  connectionRetryTimeout: 90000000,
  connectionRetryCount: 1,
  maxInstances: 1,
  specs: ['src/features/**/*.feature'],
  reporters: [
    'spec',
    [
      'html-nice',
      {
        debug: true,
        outputDir: './reports/html-reports/',
        filename: 'report.html',
        reportTitle: 'Test Report Title',
        linkScreenshots: true,
        showInBrowser: true,
        collapseTests: false,
        useOnAfterCommandForScreenshot: false,
      },
    ],
  ],
  cucumberOpts: {
    requireModule: [
      () => {
        require('ts-node').register({ transpileOnly: true });
      },
    ],
    backtrace: false,
    compiler: [],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tags: [],
    timeout: 200000,
    ignoreUndefinedDefinitions: false,
    tagExpression: '',
  },
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    tsConfigPathsOpts: {
      baseUrl: './',
    },
  },
  services: [
    [
      'appium',
      {
        command: 'appium',
      },
    ],
  ],
  onPrepare: function (config, capabilities) {
    reportAggregator = new ReportAggregator({
      outputDir: './reports/html-reports/',
      filename: 'report-qa.html',
      reportTitle: 'Evidencia dos Testes',
      browserName: capabilities.browserName,
      collapseTests: true,
    });
    reportAggregator.clean();
  },

  onComplete: function () {
    (async () => {
      await reportAggregator.createReport();
    })();
  },
};
