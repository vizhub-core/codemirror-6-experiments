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
  let browser;
  let page;

  describe('Setup', () => {
    it('should open page', async function() {
      browser = await puppeteer.launch(puppeteerOptions);
      page = await browser.newPage();
      const response = await retry(() => page.goto('http://localhost:3000'), 1000);
      console.log(response.status());
      assert.equal(response.status(), 200);
    });
  }).timeout(5000);
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
