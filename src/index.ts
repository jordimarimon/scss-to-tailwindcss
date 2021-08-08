import postcss, { Root, Declaration, Rule, LazyResult } from 'postcss';
import { stripJsonComments } from './strip-json-comments';
import { encode } from './get-json-from-scss-value';
import { existsSync, readFileSync } from 'fs';
import { stripOuter } from './strip-outer';
import postcssScss from 'postcss-scss';
import { camelize } from './camelize';
import * as sass from 'sass';


/**
 * Parses a SCSS file and extracts all of it's SCSS variables.
 * Expects the SCSS variable to be in kebab-case.
 *
 * https://github.com/niksy/get-sass-vars
 *
 * @param path - The path of the SCSS file
 *
 * @returns A JSON with all the SCSS variables in "lowerCamelCase"
 */
export function parse(path: string): { [key: string]: any } {
    if (!existsSync(path)) {
        throw new Error(`The file doesn't exist: "${path}"`);
    }

    const result: { [key: string]: string } = {};
    const content = stripJsonComments(readFileSync(path, 'utf-8'));
    const noop = () => ({postcssPlugin: '_noop'});
    const cssProcessor = postcss([noop()]);

    const firstParsing: LazyResult = cssProcessor.process(content, {syntax: postcssScss, from: undefined});
    const firstRoot: Root = firstParsing.root;

    const node = postcss.rule({selector: '.__sassVars__'});
    firstRoot.walkDecls(/^\$/, (decl: Declaration) => {
        if (decl.parent === firstRoot) {
            node.append({
                prop: 'content',

                // Decl.prop as property is wrapped inside quotes so it doesn't get transformed with Sass
                // decl.prop as value will be transformed with Sass
                value: `"${decl.prop}" ":" json-encode(${decl.prop})`,
            });
        }
    });
    firstRoot.append(node);

    const parsedSass = sass.renderSync({
        data: firstRoot.toString(),
        functions: {'json-encode($value)': encode},
    });
    const secondParsing: LazyResult = cssProcessor.process(parsedSass.css.toString(), {from: undefined});
    const secondRoot: Root = secondParsing.root;

    secondRoot.walkRules('.__sassVars__', (rule: Rule) => {
        rule.walkDecls('content', (decl: Declaration) => {
            const [property, value] = decl.value.split(' ":" ');

            let transformedKey = stripOuter(property, '"').slice(1);

            if (transformedKey.includes('-')) {
                transformedKey = camelize(transformedKey);
            }

            result[transformedKey] = JSON.parse(stripOuter(value, "'"));
        });
    });

    return result;
}
