/*
 * ---------- Null and Undefined ----------
 */

import type { Ref } from 'vue'

export type Optional<T> = T | undefined
export type Nullable<T> = T | null
export type Nullish<T> = T | null | undefined

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

/**
 * Determines if the value of a ref is not nullish.
 * @param ref the ref to check
 * @returns `true` if the value of the ref is not nullish.
 * @see notNullish
 */
export function notNullishRef<T>(ref: Ref<T>): ref is Ref<NonNullable<T>> {
    return notNullish(ref.value)
}

/*
 * ---------- Objects ----------
 */

export type AnyObject = Record<string | number | symbol, unknown>
export type EmptyObject = Record<string, never>

export function isAnyObject(object: unknown): object is AnyObject {
    return typeof object === 'object' && !Array.isArray(object)
}

/**
 * Marks all properties of an object (including sub-objects) as readonly.
 */
export type ReadonlyObject<T extends AnyObject> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    readonly [P in keyof T]: T[P] extends ReadonlyObject<infer _U>
        ? T[P]
        : T[P] extends AnyObject
        ? ReadonlyObject<T[P]>
        : T[P]
}

/**
 * Returns the same object casted to a {@link ReadonlyObject}.
 */
export function readonlyObject<T extends AnyObject>(object: T): ReadonlyObject<T> {
    return object as ReadonlyObject<T>
}

/*
 * ---------- Unique Id ----------
 */

let currentId = 1

/**
 * Generates and returns a non random but unique id.
 */
export function uniqueId(): number {
    return currentId++
}
