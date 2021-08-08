const {parse} = require('../dist/index.cjs.js');
const {join} = require('path');

test('parse', () => {
    const result = parse(join(__dirname, '_config.scss'));
    const expected = {
        screens: {
            xs: '30em',
            sm: '40em',
            md: '48em',
            lg: '64em',
            xl: '80em'
        },
        spacing: {
            '0': 0,
            '1': '0rem',
            '2': '1rem',
            '3': '1rem',
            '4': '1rem',
            '5': '1rem',
            '6': '2rem',
            '7': '2rem',
            '8': '2rem',
            '9': '2rem',
            '10': '3rem',
            '11': '3rem',
            '12': '3rem',
            '14': '4rem',
            '16': '4rem',
            auto: 'auto',
            '0.5': '0rem',
            '1.5': '0rem',
            '2.5': '1rem',
            '3.5': '1rem'
        },
        width: {
            '0': '0px',
            auto: 'auto',
            '1/12': '8%',
            '1/6': '17%',
            '1/5': '20%',
            '1/4': '25%',
            '1/3': '33%',
            '2/5': '40%',
            '1/2': '50%',
            '3/5': '60%',
            '2/3': '67%',
            '3/4': '75%',
            '4/5': '80%',
            full: '100%',
            screen: '100vw',
            min: 'min-content',
            max: 'max-content'
        },
        fontSize: {
            xs: '1rem',
            sm: '1rem',
            base: '1rem',
            lg: '1rem',
            xl: '1rem',
            '2xl': '2rem',
            '3xl': '2rem',
            '4xl': '2rem',
            '5xl': '3rem'
        },
        fontWeight: {
            thin: 100,
            extralight: 200,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
            black: 900
        },
        letterSpacing: {
            tighter: '0em',
            tight: '0em',
            normal: '0em',
            wide: '0em',
            wider: '0em',
            widest: '0em'
        },
        colors: {
            white: 'rgb(255,255,255)',
            black: 'rgb(0,0,0)',
            current: 'currentColor',
            primary: {
                '100': 'rgb(255,241,240)',
                '200': 'rgb(255,193,189)',
                '300': 'rgb(255,98,87)',
                '400': 'rgb(255,50,36)',
                '500': 'rgb(255,17,0)',
                '600': 'rgb(240,16,0)',
                '700': 'rgb(189,13,0)',
                '800': 'rgb(87,6,0)'
            },
            gray: {
                '100': 'rgb(230,230,230)',
                '200': 'rgb(217,217,217)',
                '300': 'rgb(191,191,191)',
                '400': 'rgb(153,153,153)',
                '500': 'rgb(102,102,102)',
                '600': 'rgb(77,77,77)',
                '700': 'rgb(51,51,51)',
                '800': 'rgb(26,26,26)'
            }
        }
    };

    expect(result).toEqual(expected);
});
