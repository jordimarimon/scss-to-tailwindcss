/**
 * Converts a kebab-case word to lowerCamelCase.
 *
 * @param str - The kebab-case word
 *
 * @returns The lowerCamelCase word
 */
export function camelize(str: string): string {
    return str.split('-').map((item, index) => {
        return index
            ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
            : item.toLowerCase();
    }).join('');
}
