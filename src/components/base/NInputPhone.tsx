import { createComponent, createProps } from '@/utils/vue-collection/component'
import { external } from '@/utils/vue-collection/validation'
import { computed, Suspense } from 'vue'
import NValInput, { nValInputProps } from './NValInput'

export const nInputPhoneProps = createProps(nValInputProps)

/**
 * The `NInputPhone` autoformats phone numbers and checks if they are valid.
 */
export default createComponent('NInputPhoneSuspended', nInputPhoneProps, props => {
    // Async components have to be wrapped in a suspense component.
    return () => (
        <Suspense>
            <NPhoneInput {...props} />
        </Suspense>
    )
})

const NPhoneInput = createComponent('NInputPhone', nInputPhoneProps, async props => {
    // import dynamically for better codesplitting as the library is pretty large
    const { parsePhoneNumber } = await import('awesome-phonenumber')
    const DEFAULT_COUNTRY_CODE = 'CH'

    const formattedToPlain = (number: string) => parsePhoneNumber(number, DEFAULT_COUNTRY_CODE).getNumber('e164')
    const plainToFormatted = (number: string) =>
        parsePhoneNumber(number, DEFAULT_COUNTRY_CODE).getNumber('international')

    const onUpdateValue = (newValue: string) => {
        const plain = formattedToPlain(newValue)
        props.onUpdateValue?.(plain || newValue)
    }

    const value = computed(() => {
        const formatted = plainToFormatted(props.value || '')
        return formatted || props.value
    })

    const isValid = computed(() => parsePhoneNumber(props.value || '').isValid())

    return () => (
        <NValInput
            {...{ ...props, onUpdateValue }}
            value={value.value}
            rules={external(isValid.value, 'phone')}
            type="tel"
        />
    )
})
