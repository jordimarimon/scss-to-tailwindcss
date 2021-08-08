/**
 * https://github.com/sindresorhus/strip-outer
 * https://github.com/sindresorhus/escape-string-regexp
 *
 * @param input
 * @param substring
 */
export function stripOuter(input: string, substring: string): string {
    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form
    // would be disallowed by Unicode patterns’ stricter grammar.
    substring = substring
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');

    return input.replace(new RegExp(`^${substring}|${substring}$`, 'g'), '');
}
