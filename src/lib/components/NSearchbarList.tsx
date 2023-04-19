import { createComponentWithSlots } from '../utils/component'
import { ref } from 'vue'
import { vModelProps } from '../utils/vModel'

import NSearchbar, { nSearchbarProps, type NSearchbarExposed } from './NSearchbar'
import NSuggestionList, { nSuggestionListPropsForConfig } from './NSuggestionList'

export const nSearchbarListProps = {
    ...nSuggestionListPropsForConfig,
    ...vModelProps(String),
    /**
     * @see {@link nSearchbarProps.placeholder}
     */
    placeholder: nSearchbarProps.placeholder,
    /**
     * Adds the classes directly to the input (e.g. for shadow).
     */
    inputClass: String,
    /**
     * Adds the classes to the top-level element.
     */
    addClass: String,
} as const

/**
 * The `NSearchbarList` is a {@link NSearchbar} with a {@link NSuggestionList}.
 */
export default createComponentWithSlots('NSearchbarList', nSearchbarListProps, ['listItem'], props => {
    const searchbarRef = ref<NSearchbarExposed>()

    return () => (
        <NSuggestionList
            {...props}
            inputValue={props.value || ''}
            input={({ onFocus, onBlur }) => (
                <NSearchbar
                    ref={searchbarRef}
                    value={props.value}
                    onUpdateValue={props.onUpdateValue}
                    placeholder={props.placeholder}
                    inputClass={`shadow-lg ${props.inputClass}`}
                    addClass={props.addClass}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )}
            onRequestInputFocus={() => searchbarRef.value?.focus()}
        />
    )
})
