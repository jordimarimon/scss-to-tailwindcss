const {parse} = require('../dist/index.cjs.js');
const loadJsonFile = require('load-json-file');
const {join} = require('path');

test('parse', async () => {
    const result = parse(join(__dirname, 'fixtures', '_config.scss'));
    const expected = await loadJsonFile(join(__dirname, 'fixtures', 'expected.json'));

    expect(result).toEqual(expected);
});
