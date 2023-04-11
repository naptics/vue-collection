import en from './en'
import de from './de'
import { createI18n } from 'vue-i18n'
import { registerTranslationProvider } from '@/lib/i18n'

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        de,
    },
})

registerTranslationProvider({
    trsl(key, params) {
        return i18n.global.t(key, params == null ? {} : params)
    },
    trslc(key, count, params) {
        const newCount = count ?? 0
        const newParams = { n: newCount, ...params }
        return i18n.global.t(key, newParams, { plural: newCount })
    },
})
