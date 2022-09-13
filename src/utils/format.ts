/**
 * Returns a shortened string with '...' at the end if it is longer than the given `maxLength`.
 * @param input the string to shorten
 * @param maxLength the max length
 * @see maxLengthSplitCenter
 */
export function maxLength(input: string | null, maxLength: number): string {
    if (input && input.length > maxLength) return `${input.substring(0, maxLength - 3)}...`
    else return input || ''
}

/**
 * Returns a shortened string with '...' in the center of the string if it is longer than the given `maxLength`.
 * @param input the string to shorten
 * @param maxLength the max length
 * @see maxLength
 */
export function maxLengthSplitCenter(input: string | null, maxLength: number): string {
    if (input && input.length > maxLength) {
        const chars = maxLength - 3
        const charsAtStart = Math.ceil(chars / 2)
        const charsAtEnd = Math.floor(chars / 2)
        return `${input.substring(0, charsAtStart)}...${input.substring(input.length - charsAtEnd)}`
    } else return input || ''
}
