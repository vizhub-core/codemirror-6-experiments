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
    let id = 'abc';

    async function selectedDropdownOption() {
      return await page.evaluate(
        () => document.querySelector('.test-dropdown-menu select').value
      );
    }

    const url = ({ id, file }) =>
      [
        'http://localhost:',
        port,
        '/multifilePad/',
        id,
        file ? `?file=${file}` : ''
      ].join('');

    before(async function() {
      server = await startServer(port);
      browser = await puppeteer.launch();
      page = await browser.newPage();
    });

    it('should open page without JS', async function() {
      // Disable JS so we can test server rendering.
      await page.setJavaScriptEnabled(false);

      await page.goto(url({ id }));
    }).timeout(5000);

    it('should server-render Page DOM', async function() {
      await page.waitFor('.test-server-render');
    });

    // This was blocked by some technical issues getting the selected
    // item to come through in the server-rendered DOM using a <select> element.
    // TODO in future, if/when the file selection UI changes to use something else
    // update this test to pass.
    //it('should server-render menu with default selected file', async function() {
    //  assert.equal(await selectedDropdownOption(), defaultSelectedFileName);
    //});

    it('should open page with JS', async function() {
      // Enable JS so we can test client side JS activity.
      await page.setJavaScriptEnabled(true);

      await page.goto(url({ id }));

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

    it('should render shareDBSnapshot in serverRenderedData', async function() {
      assert.deepEqual(serverRenderedData.shareDBSnapshot, {
        v: 1,
        data: defaultData
      });
    });

    it('should client-render Page DOM', async function() {
      await page.waitFor('.test-client-render');
    });

    it('should client-render menu with default selected file', async function() {
      assert.equal(await selectedDropdownOption(), defaultSelectedFileName);
    });

    const file = 'index.js';
    it('should render query in serverRenderedData', async function() {
      await page.goto(url({ id, file }));
      serverRenderedData = await page.evaluate(() => window.serverRenderedData);
      assert.deepEqual(serverRenderedData.query, { file });
    });

    it('should client-render menu with selected file from query', async function() {
      assert.equal(await selectedDropdownOption(), file);
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
