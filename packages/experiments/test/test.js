import puppeteer from 'puppeteer';
import assert from 'assert';
import { defaultData } from '../src/pages/multifilePad/defaultData';
import { startServer } from '../src/server/startServer';
import { defaultSelectedFileName } from '../src/pages/multifilePad/page';

const port = 5000;

describe('vizhub-io', () => {
  describe('multifilePad', () => {
    let browser;
    let page;
    let server;
    let serverRenderedData;

    async function selectedDropdownOption() {
      return await page.evaluate(
        () => document.querySelector('.test-dropdown-menu select').value
      );
    }

    before(async function() {
      server = await startServer(port);
      browser = await puppeteer.launch();
      page = await browser.newPage();
    });

    // Disable JS so we can test server rendering.
    it('should open page without JS', async function() {
      await page.setJavaScriptEnabled(false);
      await page.goto(`http://localhost:${port}/multifilePad/abc`);
    }).timeout(5000);

    it('should server-render Page DOM', async function() {
      await page.waitFor('.test-server-render');
    });

    //it('should server-render menu with default selected file', async function() {
    //  assert.equal(await selectedDropdownOption(), defaultSelectedFileName);
    //});

    //it('should server-render menu with selected file from query', async function() {
    //  await page.goto(
    //    `http://localhost:${port}/multifilePad/abc?file=index.js`
    //  );
    //  assert.equal(await selectedDropdownOption(), 'index.js');
    //});

    // Enable JS so we can test client side JS activity.
    it('should open page with JS', async function() {
      await page.setJavaScriptEnabled(true);
      await page.goto(
        `http://localhost:${port}/multifilePad/abc?file=index.js`
      );
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

    after(async function() {
      await browser.close();
      await new Promise(resolve => server.close(resolve));
    });
  }).timeout(20000);
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
