import { trsl } from '@/i18n'
import type { Identifiable } from '@/utils/identifiable'
import { createComponent, createProps } from '@/utils/component'
import { computed, ref, type PropType } from 'vue'
import NLoadingIndicator from './NLoadingIndicator'

export const nSuggestionListPropsForConfig = createProps({
    items: {
        type: Array as PropType<Array<SuggestionItem>>,
        default: () => [],
    },
    maxItems: {
        type: Number,
        default: () => 8,
    },
    hideList: Boolean,
    /**
     * If the list should show a loading indicator when no elements are passed in the `items` prop.
     */
    loading: Boolean,
    /**
     * Is called with the id of the selected item.
     */
    onSelect: Function as PropType<(id: string) => void>,
    /**
     * The slot for every item of the list.
     */
    listItem: Function as PropType<(props: ItemSlotProps) => JSX.Element>,
    /**
     * The current value of the input.
     */
    value: String,
    /**
     * This function is called, when the input and the suggestion list are really blurred.
     * This means, it's not just the input temporarly beeing blurred because the user clicks on the item list,
     * but the focus has completely disappeared from the input and the list.
     */
    onRealBlur: Function as PropType<() => void>,
})

export const nSuggestionListPropsForInput = createProps({
    /**
     * The slot for the input, which will be enhanced with the suggestion list.
     */
    input: {
        type: Function as PropType<(props: InputSlotProps) => JSX.Element>,
        required: true,
    },
    /**
     * When this function is called, the parent is required to call focus() on the input element.
     * It won't work properly if the parent does not request focus on the input.
     */
    onRequestInputFocus: {
        type: Function as PropType<() => void>,
        required: true,
    },
})

export const nSuggestionListProps = createProps({
    ...nSuggestionListPropsForConfig,
    ...nSuggestionListPropsForInput,
})

export type InputSlotProps = {
    /**
     * Should be called when the input receives focus.
     */
    onFocus(): void
    /**
     * Should be called when the input is blurred.
     */
    onBlur(): void
}

export type ItemSlotProps<T extends Identifiable = SuggestionItem> = {
    /**
     * The current item of the list
     */
    item: T
    /**
     * Is true, when the current item is highlighted ("hovered" with the keys)
     */
    highlighted: boolean
}

export type SuggestionItem = Identifiable & { label?: string } & Record<string, unknown>

export default createComponent('NSuggestionList', nSuggestionListProps, props => {
    const selectedIndex = ref<number | null>(null)
    const displayItems = computed(() => props.items.slice(0, props.maxItems))

    const isInFocus = ref(false)
    const showList = computed(() => isInFocus.value && !props.hideList)

    let listButtonClicked = false

    const onFocus = () => (isInFocus.value = true)
    const onListMouseDown = () => (listButtonClicked = true)
    const onListMouseLeave = () => props.onRequestInputFocus()

    const onBlur = () => {
        if (!listButtonClicked) {
            isInFocus.value = false
            props.onRealBlur?.()
        }
        listButtonClicked = false
    }

    const onSelect = (id: string) => {
        props.onSelect?.(id)
        props.onRequestInputFocus()
    }

    const keydown = (event: KeyboardEvent) => {
        if (event.key == 'ArrowDown') {
            event.preventDefault()
            nextItem()
        } else if (event.key == 'ArrowUp') {
            event.preventDefault()
            previoiusItem()
        } else if (event.key == 'Enter') {
            event.preventDefault()
            const index = selectedIndex.value
            if (index != null && index < displayItems.value.length) {
                onSelect(displayItems.value[index].id)
            }
        }
    }

    const nextItem = () => {
        adjustIndexToSize()
        const currentIndex = selectedIndex.value
        let nextIndex: number | null = currentIndex == null ? 0 : currentIndex + 1
        if (nextIndex >= displayItems.value.length) nextIndex = null
        selectedIndex.value = nextIndex
    }

    const previoiusItem = () => {
        adjustIndexToSize()
        const currentIndex = selectedIndex.value
        let previousIndex: number | null = currentIndex == null ? displayItems.value.length - 1 : currentIndex - 1
        if (previousIndex < 0) previousIndex = null
        selectedIndex.value = previousIndex
    }

    const adjustIndexToSize = () => {
        if (selectedIndex.value != null && selectedIndex.value >= displayItems.value.length) {
            selectedIndex.value = null
        }
    }

    return () => (
        <div onKeydown={keydown}>
            {props.input({ onFocus, onBlur })}
            <div class="relative">
                {showList.value && (
                    <div class="bg-white rounded-md shadow-lg p-2 absolute top-2 left-0 min-w-full z-10">
                        <ul>
                            {displayItems.value.map((item, index) => (
                                <li
                                    key={item.id}
                                    class={[
                                        'focus:outline-none hover:bg-default-50 rounded-md select-none p-2 cursor-pointer',
                                        selectedIndex.value === index ? 'bg-default-50' : '',
                                    ]}
                                    onMousedown={onListMouseDown}
                                    onMouseleave={onListMouseLeave}
                                    onClick={() => onSelect(item.id)}
                                >
                                    {props.listItem?.({ item, highlighted: selectedIndex.value === index }) ||
                                        item.label}
                                </li>
                            ))}

                            {displayItems.value.length == 0 && (
                                <div class="p-2 text-sm font-medium text-default-700">
                                    {props.loading ? (
                                        <div class="flex items-center space-x-2">
                                            <NLoadingIndicator size={6} />
                                            <span> {trsl('general.text.loading-search-results')}</span>
                                        </div>
                                    ) : (
                                        <div>{trsl('general.text.no-search-results', { input: props.value })}</div>
                                    )}
                                </div>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
})
