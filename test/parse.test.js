const {parse} = require('../dist/index.cjs.js');
const loadJsonFile = require('load-json-file');
const {join} = require('path');

test('basic configuration without extending default', async () => {
    const result = parse(join(__dirname, 'fixtures', '_basic-config.scss'));
    const expected = await loadJsonFile(join(__dirname, 'fixtures', 'basic-expected.json'));

    expect(result).toEqual(expected);
});

test('default configuration only', async () => {

});

test('partially overriding default configuration', async () => {

});
