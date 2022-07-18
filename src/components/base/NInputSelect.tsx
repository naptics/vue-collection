import { createComponent, createProps, vModel } from '@/utils/component'
import { findId, type Identifiable } from '@/utils/identifiable'
import { option } from '@/utils/validation'
import { watchRef } from '@/utils/vue'
import { computed, ref, type PropType } from 'vue'
import { nInputProps } from './NInput'
import NSuggestionList, { nSuggestionListProps } from './NSuggestionList'
import NValInput, { nValInputProps, type NValInputExposed } from './NValInput'

export const nInputSelectProps = createProps({
    ...nInputProps,
    optional: nValInputProps.optional,
    form: nValInputProps.form,
    error: nValInputProps.error,
    errorMessage: nValInputProps.errorMessage,
    hideList: nSuggestionListProps.hideList,
    maxItems: nSuggestionListProps.maxItems,
    ...vModel<InputSelectOption>(Object),
    /**
     * The options which the user can select from.
     */
    options: {
        type: Array as PropType<InputSelectOption[]>,
        default: () => [],
    },
})

export type InputSelectOption = Identifiable & { label: string }

/**
 * The `NInputSelect` is very similar to the {@link NSelect}, but instead of a select input it is a regular input.
 * The user is forced to use a value from the specified options of the input.
 */
export default createComponent('NInputSelect', nInputSelectProps, props => {
    const inputRef = ref<NValInputExposed>()

    const filteredOptions = computed(() =>
        props.options.filter(option => option.label.includes(props.value?.label || ''))
    )

    const matchedOption = computed(() => {
        const matches = props.options.filter(option => option.label === props.value?.label)
        return matches.length > 0 ? matches[0] : null
    })
    watchRef(matchedOption, newOption => updateId(newOption?.id || ''))

    const updateId = (id: string) => props.onUpdateValue?.({ id, label: props.value?.label || '' })
    const updateLabel = (label: string) => props.onUpdateValue?.({ label, id: props.value?.id || '' })
    const selectId = (id: string) => {
        const selected = findId(props.options, id)
        if (selected != null) props.onUpdateValue?.(selected)
    }

    return () => (
        <NSuggestionList
            items={filteredOptions.value}
            onSelect={selectId}
            value={props.value?.label}
            hideList={props.hideList || matchedOption.value != null || filteredOptions.value.length == 0}
            maxItems={props.maxItems}
            input={({ onFocus, onBlur }) => (
                <NValInput
                    ref={inputRef}
                    {...{ ...props, onUpdateValue: updateLabel }}
                    value={props.value?.label}
                    rules={[option(props.options.map(opt => opt.label))]}
                    onFocus={() => {
                        onFocus()
                        props.onFocus?.()
                    }}
                    onBlur={onBlur}
                    disableBlurValidation
                />
            )}
            onRequestInputFocus={() => inputRef.value?.focus()}
            onRealBlur={() => {
                props.onBlur?.()
                inputRef?.value?.validate()
            }}
        />
    )
})
