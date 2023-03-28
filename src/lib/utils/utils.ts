import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export type AnyObject = Record<string | number | symbol, unknown>
export type EmptyObject = Record<string, never>

export type Optional<T> = T | undefined
export type Nullable<T> = T | null
export type Nullish<T> = T | null | undefined

export type HeroIcon = FunctionalComponent<HTMLAttributes & VNodeProps>

export type ReadonlyObject<T extends AnyObject> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    readonly [P in keyof T]: T[P] extends ReadonlyObject<infer _U>
        ? T[P]
        : T[P] extends AnyObject
        ? ReadonlyObject<T[P]>
        : T[P]
}

export function markReadonly<T extends AnyObject>(object: T): ReadonlyObject<T> {
    return object as ReadonlyObject<T>
}

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
export function notNullish<T>(value: Nullish<T>): value is T {
    return value !== null && value !== undefined
}

/**
 * Determines if a value is null or undefined.
 * @param value the value to check
 * @returns `true` if the value is `null` or `undefined`.
 */
export function isNullish(value: Nullish<unknown>): value is null | undefined {
    return value === null || value === undefined
}
