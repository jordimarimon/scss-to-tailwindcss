/**
 *
 *
 * @param str
 */
export function camelize(str: string): string {
    return str.split('-').map((item, index) => {
        return index
            ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
            : item.toLowerCase();
    }).join('');
}
