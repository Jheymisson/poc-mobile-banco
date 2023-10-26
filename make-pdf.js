let printPdf = require('@rpii/wdio-html-reporter-pdf').default;
let path = require('path');
(async () => {
  let htmlReportFile = path.resolve(
    __dirname,
    'reports/html-reports/report-qa.html',
  );
  let pdfFile = path.resolve(__dirname, 'reports/report-qa.pdf');
  let options = ['--no-sandbox', '--disable-gpu', '--disable-extensions'];
  await printPdf(htmlReportFile, pdfFile, options);
})();
