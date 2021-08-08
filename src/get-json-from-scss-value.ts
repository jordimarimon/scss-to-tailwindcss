import { stripOuter } from './strip-outer';
import sass from 'sass';

/**
 * @param {sass.types.List} list
 *
 * @returns {Array}
 */
function listToArray(list: sass.types.List) {
    const length = list.getLength();
    const data = [];

    for (const index of Array.from({ length }).keys()) {
        const value = getJsonValueFromSassValue(list.getValue(index));

        data.push(value);
    }

    return data;
}

/**
 * @param {sass.types.Map} map
 *
 * @returns {object}
 */
function mapToObject(map: sass.types.Map) {
    const length = map.getLength();
    const data: {[key: string]: any} = {};

    for (const index of Array.from({ length }).keys()) {
        const key = map.getKey(index).toString();

        data[stripOuter(key, '"')] = getJsonValueFromSassValue(map.getValue(index));
    }

    return data;
}


/**
 * @param {sass.types.*} value
 *
 * @returns {*}
 */
function getJsonValueFromSassValue(value: unknown): any {
    let resolvedValue;

    if (value instanceof sass.types.List) {
        resolvedValue = listToArray(value);
    } else if (value instanceof sass.types.Map) {
        resolvedValue = mapToObject(value);
    } else if (value instanceof sass.types.Color) {
        const rgbValue = [value.getR(), value.getG(), value.getB()];
        const alphaValue = value.getA();

        if (alphaValue === 1) {
            resolvedValue = `rgb(${rgbValue.join(',')})`;
        } else {
            resolvedValue = `rgba(${rgbValue.join(',')}, ${alphaValue})`;
        }
    } else if (value instanceof sass.types.Number) {
        if (value.getUnit() !== '') {
            resolvedValue = String(Math.round(Number(value.getValue())) + value.getUnit());
        } else {
            resolvedValue = Math.round(Number(value.getValue()));
        }
    } else if (value instanceof sass.types.String) {
        resolvedValue = value.getValue();
    } else {
        resolvedValue = null;
    }

    return resolvedValue;
}

/**
 *
 *
 * @param value
 */
export function encode(value: unknown): sass.types.String {
    return new sass.types.String(`'${JSON.stringify(getJsonValueFromSassValue(value))}'`);
}
