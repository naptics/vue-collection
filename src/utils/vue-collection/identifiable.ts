export type Identifiable = Readonly<{ id: string }>
export type MaybeIdentifiable = Readonly<{ id: string | null }>

/**
 * Looks for the id in the array of identifiables.
 * @param array the array to search.
 * @param id the id to find in the array.
 * @returns the first element with the specified id or null if none exists.
 */
export function findId<T extends Identifiable>(array: T[], id: string | null | undefined): T | null {
    if (id == null) return null
    const filtered = array.filter(item => item.id == id)
    if (filtered.length > 0) return filtered[0]
    else return null
}
