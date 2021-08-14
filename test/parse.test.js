const {parse} = require('../dist/index.cjs.js');
const {readFileSync} = require('fs');
const {join} = require('path');

test('basic configuration', async () => {
    const result = parse(join(__dirname, 'fixtures', '_basic-config.scss'));
    const expected = JSON.parse(readFileSync(join(__dirname, 'fixtures', 'basic-expected.json'), 'utf8'));

    expect(result).toEqual(expected);
});

test('default configuration', async () => {
    const result = parse(join(__dirname, '..', '_default.scss'));
    const expected = JSON.parse(readFileSync(join(__dirname, 'fixtures', 'default-expected.json'), 'utf8'));

    expect(result).toEqual(expected);
});
