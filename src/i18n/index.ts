import en from './en'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en,
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
 * @param key the key to translate.
 * @param count the count used for the pluralization.
 * @param params formatting parameters for the message.
 * @returns the translated message.
 * @see trsl
 */
export function trslc(key: string, count: number | null, params?: Record<string, unknown>): string {
    return i18n.global.tc(key, count == null ? 0 : count, params == null ? {} : params) as string
}
