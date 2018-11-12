import puppeteer from 'puppeteer';
import assert from 'assert';
import { defaultData } from '../src/pages/multifilePad/getOrCreateMultifileDoc';

const puppeteerOptions = { args: ['--no-sandbox'] };

const retry = (fn, ms) =>
  new Promise(resolve => {
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
    let serverRenderedData;

    it('should open page', async function() {
      browser = await puppeteer.launch(puppeteerOptions);
      page = await browser.newPage();
      const response = await retry(
        () => page.goto('http://localhost:3000/multifilePad/abc'),
        1000
      );
      assert.equal(response.status(), 200);
    }).timeout(60000);

    it('should render serverRenderedData on the server', async function() {
      serverRenderedData = await page.evaluate(() => window.serverRenderedData);
      assert(serverRenderedData);
    });

    it('should render route in serverRenderedData', async function() {
      assert.equal(serverRenderedData.route, 'multifilePad');
    });

    it('should render id in serverRenderedData', async function() {
      assert.equal(serverRenderedData.id, 'abc');
    });

    it('should render shareDBSnapshot in serverRenderedData', async function() {
      assert.deepEqual(serverRenderedData.shareDBSnapshot, {
        v: 1,
        data: defaultData
      });
    });

    it('should close browser', async function() {
      await browser.close();
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
