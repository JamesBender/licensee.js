var fs = require('fs');
var licensee = require('..');
var path = require('path');
var temp = require('temp').track();

require('tap').test('missing license', function(test) {
  test.plan(2);
  temp.mkdir('test', function(error, tmp) {
    fs.writeFileSync(
      path.join(tmp, 'package.json'),
      JSON.stringify({dependencies: {'a': '*'}})
    );
    fs.mkdirSync(path.join(tmp, 'node_modules'));
    fs.mkdirSync(path.join(tmp, 'node_modules', 'a'));
    fs.writeFileSync(
      path.join(tmp, 'node_modules', 'a', 'package.json'),
      JSON.stringify({name: 'a', private: true})
    );

    var configuration = {};

    licensee(tmp, configuration, function(error, problems) {
      test.error(error);
      test.strictDeepEquals(problems, []);
    });
  });
});