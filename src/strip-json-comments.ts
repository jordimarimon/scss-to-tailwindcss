const singleComment = Symbol('singleComment');
const multiComment = Symbol('multiComment');

/**
 *
 *
 * @param jsonString
 * @param quotePosition
 */
const isEscaped = (jsonString: string, quotePosition: number): boolean => {
    let index = quotePosition - 1;
    let backslashCount = 0;

    while (jsonString[index] === '\\') {
        index -= 1;
        backslashCount += 1;
    }

    return !!(backslashCount % 2);
};


/**
 *
 *
 * @param jsonString
 */
export function stripJsonComments(jsonString: string): string {
    let insideString = false;
    let insideComment: Symbol | null = null;
    let offset = 0;
    let result = '';

    for (let i = 0; i < jsonString.length; i++) {
        const currentCharacter = jsonString[i];
        const nextCharacter = jsonString[i + 1];

        if (!insideComment && currentCharacter === '"') {
            const escaped = isEscaped(jsonString, i);
            if (!escaped) {
                insideString = !insideString;
            }
        }

        if (insideString) {
            continue;
        }

        if (!insideComment && currentCharacter + nextCharacter === '//') {
            result += jsonString.slice(offset, i);
            offset = i;
            insideComment = singleComment;
            i++;
        } else if (insideComment === singleComment && currentCharacter + nextCharacter === '\r\n') {
            i++;
            insideComment = null;
            offset = i;
        } else if (insideComment === singleComment && currentCharacter === '\n') {
            insideComment = null;
            offset = i;
        } else if (!insideComment && currentCharacter + nextCharacter === '/*') {
            result += jsonString.slice(offset, i);
            offset = i;
            insideComment = multiComment;
            i++;
        } else if (insideComment === multiComment && currentCharacter + nextCharacter === '*/') {
            i++;
            insideComment = null;
            offset = i + 1;
        }
    }

    return result + (insideComment ? '' : jsonString.slice(offset));
}
