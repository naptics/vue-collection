import { createComponent, createProps } from '@/utils/vue-collection/component'
import { Id, type Identifiable } from '@/utils/vue-collection/identifiable'
import { option } from '@/utils/vue-collection/validation'
import { watchRef } from '@/utils/vue-collection/vue'
import { computed, ref, type PropType } from 'vue'
import { nInputProps } from './NInput'
import NSuggestionList, { nSuggestionListProps } from './NSuggestionList'
import NValInput, { nValInputProps, type NValInputExposed } from './NValInput'
import { vModelProps } from '@/utils/vue-collection/vModel'

export const nInputSelectProps = createProps({
    ...nInputProps,
    ...vModelProps<InputSelectOption>(Object),
    /**
     * The options which are allowed and suggested for this input.
     * The options are filtered based on the user input.
     */
    options: {
        type: Array as PropType<InputSelectOption[]>,
        default: () => [],
    },
    /**
     * @see {@link nValInputProps.optional}
     */
    optional: nValInputProps.optional,
    /**
     * @see {@link nValInputProps.form}
     */
    form: nValInputProps.form,
    /**
     * @see {@link nValInputProps.error}
     */
    error: nValInputProps.error,
    /**
     * @see {@link nValInputProps.errorMessage}
     */
    errorMessage: nValInputProps.errorMessage,
    /**
     * If set to `true` the list is hidden even if there are still matching items in the list.
     */
    hideList: nSuggestionListProps.hideList,
    /**
     * @see {@link nSuggestionListProps.maxItems}
     */
    maxItems: nSuggestionListProps.maxItems,
    /**
     * @see {@link nSuggestionListProps.listItem}
     */
    listItem: nSuggestionListProps.listItem,
})

export type InputSelectOption = Identifiable & { label: string } & Record<string, unknown>

/**
 * The `NInputSelect` is very similar to the {@link NSelect}, but instead of a select input it is a regular input.
 * The user is forced to use a value from the specified options of the input.
 * While they type, the list of options is shown to them and filtered based on their input.
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
        const selected = Id.find(props.options, id)
        if (selected != null) props.onUpdateValue?.(selected)
    }

    return () => (
        <NSuggestionList
            items={filteredOptions.value}
            onSelect={selectId}
            inputValue={props.value?.label || ''}
            hideList={props.hideList || matchedOption.value != null || filteredOptions.value.length == 0}
            maxItems={props.maxItems}
            listItem={props.listItem}
            input={({ onFocus, onBlur }) => (
                <NValInput
                    ref={inputRef}
                    {...{ ...props, onUpdateValue: updateLabel }}
                    value={props.value?.label}
                    rules={option(props.options.map(opt => opt.label))}
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
