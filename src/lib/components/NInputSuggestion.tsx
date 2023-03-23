import { createComponent, createProps } from '../utils/component'
import { Id } from '../utils/identifiable'
import { computed, ref, type PropType } from 'vue'
import NSuggestionList, { nSuggestionListProps } from './NSuggestionList'
import NValInput, { nValInputProps, type NValInputExposed } from './NValInput'

export const nInputSuggestionProps = createProps({
    ...nValInputProps,
    /**
     * If set to `true` the list is hidden even if there are still matching items in the list.
     */
    hideList: nSuggestionListProps.hideList,
    /**
     * @see {@link nSuggestionListProps.maxItems}
     */
    maxItems: nSuggestionListProps.maxItems,
    /**
     * The suggestions which are shown to the user for this input.
     * The suggestions are filtered based on the user input.
     */
    suggestions: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
})

/**
 * `NInputSuggestion` is an input, which shows a list of possible suggestions to the user
 *  which is filtered while typing. Contrary to {@link NInputSelect} the user is not required to choose any of the suggestions.
 */
export default createComponent('NInputSuggestion', nInputSuggestionProps, props => {
    const suggestionItems = computed(() =>
        props.suggestions
            .filter(suggestion => suggestion.includes(props.value || ''))
            .map((value, index) => ({
                id: index.toString(),
                label: value,
            }))
    )

    const select = (id: string) => props.onUpdateValue?.(Id.find(suggestionItems.value, id)?.label || '')

    const hideList = computed(
        () =>
            props.hideList ||
            suggestionItems.value.length == 0 ||
            suggestionItems.value.filter(suggestion => suggestion.label !== props.value).length == 0
    )

    const inputRef = ref<NValInputExposed>()

    return () => (
        <NSuggestionList
            items={suggestionItems.value}
            onSelect={id => select(id)}
            inputValue={props.value || ''}
            hideList={hideList.value}
            maxItems={props.maxItems}
            input={({ onFocus, onBlur }) => (
                <NValInput
                    ref={inputRef}
                    {...props}
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
