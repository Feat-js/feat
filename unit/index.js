var assert = require('assert');
describe('Feat', function() {
    let Feat = require('../src');
    let feat = new Feat();

    describe('Test Components', function() {

      describe('Foreach', function() {

        it('should foreach thru array', function() {

          let opts = { array: [1,2,3] };
          feat.render("unit/html/foreach", opts, (err, html) => {
            assert.equal(html, `<script src="/featFwApi/frontend.js"></script><p>1\n</p><p>2\n</p><p>3\n</p>`);
          });

        });

      });
  
    });

  });