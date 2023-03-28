import type { Nullish } from '../utils/utils'

/**
 * @see {@link trsl}
 */
export type TranslationFunction = typeof trsl

/**
 * @see {@link trslc}
 */
export type TranslationCountFunction = typeof trslc

/**
 * A `TranslationProvider` has to implement the two functions `trsl` and `trslc`.
 */
export type TranslationProvider = {
    trsl: TranslationFunction
    trslc: TranslationCountFunction
}

let provider: TranslationProvider | undefined = undefined

/**
 * Registeres a new translation provider for vue-collection.
 * The translation provider should contain all vue-collection
 * texts located under `i18n/<lang>/vue-collection.json`.
 * @param newProvider
 */
export function registerTranslationProvider(newProvider: TranslationProvider): void {
    provider = newProvider
}

/**
 * Translates the specified key with the according message.
 * @param key the key to translate.
 * @param params formatting parameters for the message.
 * @returns the translated message.
 */
export function trsl(key: string, params?: Record<string, unknown>): string {
    if (!provider) console.warn('Vue Collection: No translation provider has been registered!')
    return provider?.trsl(key, params) ?? key
}

/**
 * Translates the specified key using pluralization.
 * The provided `count`is automatically passed as the parameter `n` to the translation library.
 * @param key the key to translate.
 * @param count the count used for the pluralization.
 * @param params formatting parameters for the message.
 * @returns the translated message.
 * @see trsl
 */
export function trslc(key: string, count: Nullish<number>, params?: Record<string, unknown>): string {
    if (!provider) console.warn('Vue Collection: No translation provider has been registered!')
    return provider?.trslc(key, count, params) ?? key
}
