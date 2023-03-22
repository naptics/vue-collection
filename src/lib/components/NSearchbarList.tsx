import { createComponent, createProps } from '../utils/component'
import { ref } from 'vue'
import { vModelProps } from '../utils/vModel'

import NSearchbar, { nSearchbarProps, type NSearchbarExposed } from './NSearchbar'
import NSuggestionList, { nSuggestionListPropsForConfig } from './NSuggestionList'

export const nSearchbarListProps = createProps({
    ...nSuggestionListPropsForConfig,
    ...vModelProps(String),
    /**
     * @see {@link nSearchbarProps.placeholder}
     */
    placeholder: nSearchbarProps.placeholder,
})

/**
 * The `NSearchbarList` is a {@link NSearchbar} with a {@link NSuggestionList}.
 */
export default createComponent('NSearchbarList', nSearchbarListProps, props => {
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
                    inputClass="shadow-lg"
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )}
            onRequestInputFocus={() => searchbarRef.value?.focus()}
        />
    )
})
