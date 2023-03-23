import { markReadonly, type Nullish } from './utils'

type IdType = string

export type Identifiable = Readonly<{ id: IdType }>
export type MaybeIdentifiable = Readonly<{ id?: Nullish<IdType> }>

/**
 * Looks for the `id` in the given array of `Identifiables`.
 * @param array The array to search the item in.
 * @param id The `id` of the desired item.
 * @returns The first item with the specified `id` or `undefined` if none exists.
 */
function find<T extends Identifiable>(array: T[], id: IdType): T | undefined {
    const filtered = array.filter(item => item.id === id)
    if (filtered.length > 0) return filtered[0]
    else return undefined
}

/**
 * Checks if the given array contains an item with the `id`.
 * @param array The array to search the item in.
 * @param id The `id` to check the array for.
 * @returns `true` if there is at least one item in the array with the given `id`.
 */
function contains<T extends Identifiable>(array: T[], id: IdType): boolean {
    return find(array, id) !== undefined
}

function insertSingle<T extends Identifiable>(baseArray: T[], insertItem: T) {
    const index = baseArray.findIndex(item => item.id === insertItem.id)
    index === -1 ? baseArray.push(insertItem) : baseArray.splice(index, 1, insertItem)
}

/**
 * Inserts the items into the given array, replacing items with the same `id`.
 * If no item with the same `id` exists, the item is appended to the array.
 * If multiple items with the same `id` exist, just the first item is replaced.
 * @param array The array to insert the items into.
 * @param insertItems The items to insert into the array.
 * @returns The reference to the same array, which was passed.
 */
function insert<T extends Identifiable>(array: T[], ...insertItems: T[]): T[] {
    insertItems.forEach(item => insertSingle(array, item))
    return array
}

/**
 * Removes all items with the specified `ids` from the given array.
 * @param array The array to remove the items from.
 * @param ids The `ids` of the items which should be removed.
 * @returns The reference to the same array, which was passed.
 */
function remove<T extends Identifiable>(array: T[], ...ids: IdType[]): T[] {
    ids.forEach(id => {
        let noMatches = false
        while (!noMatches) {
            const index = array.findIndex(item => item.id === id)
            if (index != -1) array.splice(index, 1)
            else noMatches = true
        }
    })
    return array
}

/**
 * Compares the two arrays and checks if they both have
 * items with the same `ids` in the same order.
 * @param first The first array to compare.
 * @param second The second array to compare.
 * @returns `true` if the arrays contain item with the same `ids` in the same order.
 */
function areSameArrays(first: Identifiable[], second: Identifiable[]): boolean {
    if (first.length != second.length) return false
    for (let i = 0; i < first.length; i++) {
        if (first[i]?.id !== second[i]?.id) return false
    }
    return true
}

/**
 * This object contains utility functions to deal with {@link Identifiable} objects.
 */
export const Id = markReadonly({ find, contains, insert, remove, areSameArrays })
