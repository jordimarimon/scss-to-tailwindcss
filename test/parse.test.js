const {parse} = require('../dist/index.cjs.js');
const {join} = require('path');

test('parse', async () => {
    const result = await parse(join(__dirname, '..', 'test', '_config.scss'));

});
