import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export type EmptyObject = Record<string, never>
export type HeroIcon = FunctionalComponent<HTMLAttributes & VNodeProps>

let currentId = 1
/**
 * Generates and returns a non random but unique id.
 */
export function uniqueId(): number {
    return currentId++
}

/**
 * Determines if a value is not null or undefined.
 * @param value the value to check
 * @returns `true` if the value is anything but `null` or `undefined`.
 */
export function notNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined
}
