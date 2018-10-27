// This test targets the CommonJS build intentionally.
const CodeMirror = require('./dist/codemirror');
const assert = require('assert');

describe('CodeMirror', () => {
  describe('CommonJS import in Node.js', () => {
    it('should not crash', () => {

      // If we made it to this point, the crash has not occurred.
      assert(true);
    });
  });
});
