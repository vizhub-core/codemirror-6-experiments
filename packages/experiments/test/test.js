import puppeteer from 'puppeteer';
import assert from 'assert';
import { defaultData } from '../src/pages/multifilePad/getOrCreateMultifileDoc';
//import { startServer } from '../src/server/startServer'

const puppeteerOptions = { args: ['--no-sandbox'] };

const port = 3000;

describe('vizhub-io', () => {
  describe('multifilePad', () => {
    let browser;
    let page;
    let serverRenderedData;
    //let server;

    //it('should start server', async function() {
    //  server = await startServer(port);
    //});

    it('should open page without JS', async function() {
      browser = await puppeteer.launch(puppeteerOptions);
      page = await browser.newPage();

      // Disable JS so we can test server rendering.
      await page.setJavaScriptEnabled(false);

      await page.goto(`http://localhost:${port}/multifilePad/abc`);
    });

    it('should server-render Page DOM', async function() {
      await page.waitFor('.test-server-render');
    });

    it('should open page with JS', async function() {

      // Enable JS so we can test client side JS activity.
      await page.setJavaScriptEnabled(true);

      await page.goto(`http://localhost:${port}/multifilePad/abc?file=index.js`);

      // Verify 304 not modified as page has not changed.
      //assert.equal(response.status(), 304);
    });

    it('should render serverRenderedData on the server', async function() {
      serverRenderedData = await page.evaluate(() => window.serverRenderedData);
      assert(serverRenderedData);
    });

    it('should render route in serverRenderedData', async function() {
      assert.equal(serverRenderedData.route, 'multifilePad');
    });

    it('should render params in serverRenderedData', async function() {
      assert.deepEqual(serverRenderedData.params, { id: 'abc' });
    });

    it('should render query in serverRenderedData', async function() {
      assert.deepEqual(serverRenderedData.query, { file: 'index.js' });
    });

    it('should render shareDBSnapshot in serverRenderedData', async function() {
      assert.deepEqual(serverRenderedData.shareDBSnapshot, {
        v: 1,
        data: defaultData
      });
    });

    it('should client-render Page DOM', async function() {
      await page.waitFor('.test-client-render');
    });

    it('should close browser', async function() {
      await page.close();
      await browser.close();
    });

    //it('should close server', function() {
    //  //server.close();
    //});
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
