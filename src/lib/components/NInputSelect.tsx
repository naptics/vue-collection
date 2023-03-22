import { createComponent, createProps } from '@/utils/vue-collection/component'
import { Id, type Identifiable } from '@/utils/vue-collection/identifiable'
import { option } from '@/utils/vue-collection/validation'
import { vModelForRef } from '@/utils/vue-collection/vModel'
import { watchRef } from '@/utils/vue-collection/vue'
import { computed, ref, watch, type PropType } from 'vue'
import { nInputProps } from './NInput'
import NSuggestionList, { nSuggestionListProps } from './NSuggestionList'
import NValInput, { nValInputProps, type NValInputExposed } from './NValInput'

export const nInputSelectProps = createProps({
    ...nInputProps,
    /**
     * The id of the currently selected option of this input.
     */
    value: String,
    /**
     * This is called with the newly selected id when the selection has changed.
     * This happens, when an item from the suggestion list is selected or the
     * input matches a selection option exactly.
     * If no id is selected, the empty string is passed, in order to
     * match the API of all other inputs who never pass `undefined`.
     */
    onUpdateValue: Function as PropType<(newValue: string) => void>,
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

    const inputValue = ref('')
    watch(
        () => props.value,
        newValue => {
            if (newValue) {
                const chosenOption = Id.find(props.options, newValue)
                if (chosenOption) inputValue.value = chosenOption.label
            }
        },
        { immediate: true }
    )

    const filteredOptions = computed(() =>
        props.options.filter(option => option.label.includes(inputValue.value || ''))
    )

    const matchedOption = computed(() => {
        const matches = props.options.filter(option => option.label === inputValue.value)
        return matches.length > 0 ? matches[0] : null
    })
    watchRef(matchedOption, newOption => props.onUpdateValue?.(newOption?.id || ''))

    return () => (
        <NSuggestionList
            items={filteredOptions.value}
            onSelect={props.onUpdateValue}
            inputValue={inputValue.value}
            hideList={props.hideList || matchedOption.value != null || filteredOptions.value.length == 0}
            maxItems={props.maxItems}
            listItem={props.listItem}
            input={({ onFocus, onBlur }) => (
                <NValInput
                    ref={inputRef}
                    {...{ ...props, ...vModelForRef(inputValue) }}
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
