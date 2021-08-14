# scss-to-tailwindcss

This library converts SASS variables to JSON.

You may be asking why this is needed?  

One of the limitations of using SASS with [tailwindcss](https://tailwindcss.com/) is that you can't use SASS functions/mixins with
your theme configuration. For example, the following won't compile:

```scss
.alert {
  // Won't work, Sass is processed first
  background-color: darken(theme("colors.red.500"), 10%);
}
```

This library tries to solve this limitation by providing a way to write your [tailwindcss](https://tailwindcss.com/) 
theme configuration in SASS.

Because your theme configuration is written in SASS, you can use all the power of it without any limitation.

You still can use all the power of [tailwindcss](https://tailwindcss.com/) while keeping one source of truth for your
theme configuration.

#### Especial thanks to the following libraries that I have used code from it:

* https://github.com/sindresorhus/escape-string-regexp
* https://github.com/sindresorhus/strip-outer
* https://github.com/sindresorhus/strip-json-comments
* https://github.com/niksy/node-sass-json-functions
* https://github.com/niksy/get-sass-vars

## Installation

    npm i -D scss-to-tailwindcss

## Usage

You need to define your theme options in a SASS file. 

The names of the SASS variables need to be the same as the names you would set in 
the `tailwind.config.js` file. 

You can use _kebab-case_ or _lowerCamelCase_.

The properties that need to extend the `tailwindcss` default theme, should be defined inside a SASS map named `$extend`.

An exemple of a theme configuration:

```scss

///////////////////////////////////////////////////////////////////////////////
//////////////////////// RESPONSIVENESS
///////////////////////////////////////////////////////////////////////////////

$screens: (
  "xs": 30em, // 480px
  "sm": 40em, // 640px
  "md": 48em, // 768px
  "lg": 64em, // 1024px
  "xl": 80em, // 1280px
);

///////////////////////////////////////////////////////////////////////////////
//////////////////////// SPACINGS
///////////////////////////////////////////////////////////////////////////////

$spacing: (
  "auto": auto,
  "0": 0,
  "0.5": 0.125rem,
  "1": 0.25rem,
  "1.5": 0.375rem,
  "2": 0.5rem,
  "2.5": 0.625rem,
  "3": 0.75rem,
  "3.5": 0.875rem,
  "4": 1rem,
  "5": 1.25rem,
  "6": 1.5rem,
  "7": 1.75rem,
  "8": 2rem,
  "9": 2.25rem,
  "10": 2.5rem,
  "11": 2.75rem,
  "12": 3rem,
  "14": 3.5rem,
  "16": 4rem,
);

///////////////////////////////////////////////////////////////////////////////
//////////////////////// SIZING
///////////////////////////////////////////////////////////////////////////////

$width: (
  "auto":auto,
  "0": 0px,
  "1/12": 8.333333%,
  "1/6": 16.666667%,
  "1/5": 20%,
  "1/4": 25%,
  "1/3": 33.333333%,
  "2/5": 40%,
  "1/2": 50%,
  "3/5": 60%,
  "2/3": 66.666667%,
  "3/4": 75%,
  "4/5": 80%,
  "full": 100%,
  "screen": 100vw,
  "min": min-content,
  "max": max-content,
);

///////////////////////////////////////////////////////////////////////////////
//////////////////////// TYPOGRAPHY
///////////////////////////////////////////////////////////////////////////////

$font-size: (
  "xs": 0.75rem,
  "sm": 0.875rem,
  "base": 1rem,
  "lg": 1.125rem,
  "xl": 1.25rem,
  "2xl": 1.5rem,
  "3xl": 1.875rem,
  "4xl": 2.25rem,
  "5xl": 3rem,
);

$font-weight: (
  "thin": 100,
  "extralight": 200,
  "light": 300,
  "normal": 400,
  "medium": 500,
  "semibold": 600,
  "bold": 700,
  "extrabold": 800,
  "black": 900,
);

$letter-spacing: (
  "tighter": -0.05em,
  "tight": -0.025em,
  "normal": 0em,
  "wide": 0.025em,
  "wider": 0.05em,
  "widest": 0.1em,
);

///////////////////////////////////////////////////////////////////////////////
//////////////////////// COLORS
///////////////////////////////////////////////////////////////////////////////

$colors: (
  "white": hsl(0, 0%, 100%),
  "black": hsl(0, 0%, 0%),
  "current": currentColor,
  "primary": (
    "100": hsl(4, 100%, 97%),
    "200": hsl(4, 100%, 87%),
    "300": hsl(4, 100%, 67%),
    "400": hsl(4, 100%, 57%),
    "500": hsl(4, 100%, 50%),
    "600": hsl(4, 100%, 47%),
    "700": hsl(4, 100%, 37%),
    "800": hsl(4, 100%, 17%),
  ),
  "gray": (
    "100": hsl(0, 0%, 90%),
    "200": hsl(0, 0%, 85%),
    "300": hsl(0, 0%, 75%),
    "400": hsl(0, 0%, 60%),
    "500": hsl(0, 0%, 40%),
    "600": hsl(0, 0%, 30%),
    "700": hsl(0, 0%, 20%),
    "800": hsl(0, 0%, 10%),
  ),
);

///////////////////////////////////////////////////////////////////////////////
//////////////////////// EXTEND
///////////////////////////////////////////////////////////////////////////////

$extend: (
  grid-template-columns: (
    auto: repeat(auto-fill, minmax(var(--size), 1fr)),
  ),

  grid-template-rows: (
    auto: repeat(auto-fill, minmax(var(--size), 1fr)),
  ),
);

```

The above SASS file will be translated to:

```
{
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
  extend: {
    gridTemplateColumns: {
      auto: 'repeat(auto-fill, minmax(var(--size), 1fr))'
    },
    gridTemplateRows: {
      auto: 'repeat(auto-fill, minmax(var(--size), 1fr))'
    }
  }
}
```

In your `tailwind.config.js`:

```javascript

const {parse} = require('scss-to-tailwindcss');
const {join} = require('path');

module.exports = {
    theme: {
        // Imagine you have defined your theme configuration in the same place 
        // where `tailwind.config.js` is located
        ...parse(join(__dirname, '_config.scss')),
    },  
};
```

Now, when you need to access a theme configuration property, you have three ways:

* **Using tailwindcss `@apply` directive**:

```scss

.test-class {
  @apply text-base text-white;
}

```

* **Using tailwindcss `theme` function**:

```scss

.test-class {
  font-size: theme("fontSize.base");
  color: theme("colors.white");
}

```

* **Using SASS**:
  
In your SASS main entry point add the following lines before any styles:

```scss

@use "<path-to-your-config-file>/config";
@use "~scss-to-tailwindcss/theme";
@use "sass:meta";

@include theme.set(meta.module-variables(config));

```

Now you can use some utility functions that have been written to make it easier to access 
your theme configuration from SASS:

```scss

@use "~scss-to-tailwindcss/spacing";
@use "~scss-to-tailwindcss/theme";
@use "~scss-to-tailwindcss/color";

.test-class {
  font-size: theme.get("font-size.base");
  color: theme.get("colors.white");
  
  // Now you can use all the power of SASS with tailwindcss!
  background-color: darken(theme.get("colors.primary.700"), 10%);
}

.test-class2 {
  // You can use the spacing configuration with "em" units if you need to.
  padding: spacing.em(4); // -> "1em"
}

.test-class3 {
  // You can request a color with an opacity.
  // The following will give you your default primary color with an opacity of 0.4
  color: color.get("primary.DEFAULT", 40);
}

```

## Contributing

Check out [CONTRIBUTING.md](CONTRIBUTING.md)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
