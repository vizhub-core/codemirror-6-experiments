import puppeteer from 'puppeteer';
import assert from 'assert';

const puppeteerOptions = { args: ['--no-sandbox'] };

const retry = (fn, ms) => new Promise(resolve => {
  fn()
    .then(resolve)
    .catch(() => {
      setTimeout(() => {
        console.log('retrying...');
        retry(fn, ms).then(resolve);
      }, ms);
    });
});

describe('vizhub-io', () => {

  describe('multifilePad', () => {
    let browser;
    let page;

    it('should open page', async function() {
      browser = await puppeteer.launch(puppeteerOptions);
      page = await browser.newPage();
      const response = await retry(() => page.goto('http://localhost:3000/multifilePad'), 1000);
      assert.equal(response.status(), 200);
    }).timeout(60000);

    it('should render route in serverRenderedData', async function() {
      const serverRenderedData = await page.evaluate(() => window.serverRenderedData);
      assert.equal(serverRenderedData.route, 'multifilePad');
    });

  });


});
// Pad
//   Server render CodeMirror
//   Type to save update
//     Await "Saved" indicator
//   Updates persist in pad and are server rendered
//   Content for different documents is rendered
//   Updates propagate between browsers
// Multifile
//   Switching between files shows different content
//   Deleting a file then switching shows correct content
// Index
//   Content is server-rendered
