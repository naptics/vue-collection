import { trsl } from '@/i18n'
import type { Identifiable } from '@/utils/identifiable'
import { createComponent, createProps, vModel } from '@/utils/vue'
import { computed, ref, type PropType } from 'vue'
import NLoadingIndicator from './NLoadingIndicator'
import NSearchbar, { type SearchbarExposed } from './NSearchbar'

export const nSearchbarListProps = createProps({
    ...vModel(String),
    items: {
        type: Array as PropType<Array<Identifiable>>,
        default: () => [],
    },
    maxItems: {
        type: Number,
        default: () => 8,
    },
    hideList: Boolean,
    placeholder: String,
    loading: Boolean,
    /**
     * Is called with the id of the selected item.
     */
    onSelect: Function as PropType<(id: string) => void>,
    /**
     * The slot for every item of the list.
     */
    listItem: Function as PropType<(props: ItemSlotProps) => JSX.Element>,
})

export type ItemSlotProps<T extends Identifiable = Identifiable & Record<string, unknown>> = {
    /**
     * The current item of the list
     */
    item: T
    /**
     * Is true, when the current item is highlighted ("hovered" with the keys)
     */
    highlighted: boolean
}

export default createComponent('NSearchbarList', nSearchbarListProps, props => {
    const selectedIndex = ref<number | null>(null)
    const displayItems = computed(() => props.items.slice(0, props.maxItems))

    const isInFocus = ref(false)
    const showList = computed(() => isInFocus.value && !props.hideList)

    const searchbarRef = ref<SearchbarExposed>()
    let listButtonClicked = false

    const onFocus = () => (isInFocus.value = true)
    const onListMouseDown = () => (listButtonClicked = true)
    const onListMouseLeave = () => searchbarRef.value?.focus()

    const onBlur = () => {
        if (!listButtonClicked) isInFocus.value = false
        listButtonClicked = false
    }

    const onSelect = (id: string) => {
        props.onSelect?.(id)
        searchbarRef.value?.focus()
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
                props.onSelect?.(displayItems.value[index].id)
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
        <div class="relative" onKeydown={keydown}>
            <NSearchbar
                ref={searchbarRef}
                value={props.value}
                onUpdateValue={props.onUpdateValue}
                placeholder={props.placeholder}
                inputClass="shadow-lg"
                onFocus={onFocus}
                onBlur={onBlur}
            />

            {showList.value && (
                <div class="bg-white mt-12 rounded-md shadow-lg p-2 absolute top-0 left-0 min-w-full z-10">
                    <ul>
                        {displayItems.value.map((item, index) => (
                            <li
                                key={item.id}
                                class={[
                                    'focus:outline-none hover:bg-default-50 rounded-md select-none p-2 cursor-pointer',
                                    selectedIndex.value == index ? 'bg-default-50' : '',
                                ]}
                                onMousedown={onListMouseDown}
                                onMouseleave={onListMouseLeave}
                                onClick={() => onSelect(item.id)}
                            >
                                {props.listItem?.({ item, highlighted: selectedIndex.value == index }) || item.id}
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
    )
})
