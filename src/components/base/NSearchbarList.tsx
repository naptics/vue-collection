import { createComponent, createProps, vModel } from '@/utils/component'
import { ref } from 'vue'

import NSearchbar, { type SearchbarExposed } from './NSearchbar'
import NSuggestionList, { nSuggestionListPropsForConfig } from './NSuggestionList'

export const nSearchbarListProps = createProps({
    ...nSuggestionListPropsForConfig,
    ...vModel(String),
    placeholder: String,
})

export default createComponent('NSearchbarList', nSearchbarListProps, props => {
    const searchbarRef = ref<SearchbarExposed>()

    return () => (
        <NSuggestionList
            {...props}
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
