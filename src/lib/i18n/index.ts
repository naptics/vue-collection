import en from './en'
import de from './de'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        de,
    },
})

/**
 * Translates the specified key with the according message.
 * @param key the key to translate.
 * @param params formatting parameters for the message.
 * @returns the translated message.
 */
export function trsl(key: string, params?: Record<string, unknown>): string {
    return i18n.global.t(key, params == null ? {} : params)
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
export function trslc(key: string, count: number | null | undefined, params?: Record<string, unknown>): string {
    const newCount = count ?? 0
    const newParams = { n: newCount, ...params }
    return i18n.global.t(key, newParams, { plural: newCount })
}
