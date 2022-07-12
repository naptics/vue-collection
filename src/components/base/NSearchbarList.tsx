import type { Identifiable } from '@/utils/identifiable'
import { createComponent, createProps, vModel } from '@/utils/vue'
import { computed, ref, type PropType } from 'vue'
import NLoader from './NLoader'
import NSearchbar from './NSearchbar'

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
    showList: {
        type: Boolean,
        default: () => true,
    },
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

export type ItemSlotProps = {
    /**
     * The current item of the list
     */
    item: Identifiable
    /**
     * Is true, when the current item is highlighted ("hovered" with the keys)
     */
    highlighted: boolean
}

export default createComponent('NSearchbarList', nSearchbarListProps, props => {
    const selectedIndex = ref<number | null>(null)
    const displayItems = computed(() => props.items.slice(0, props.maxItems))

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
        <div class="relative z-10" onKeydown={keydown}>
            <NSearchbar
                value={props.value}
                onUpdateValue={props.onUpdateValue}
                placeholder={props.placeholder}
                inputClass="shadow-lg"
            />

            {props.showList && (
                <div class="bg-white mt-12 rounded-md shadow-lg p-2 absolute top-0 left-0 min-w-full">
                    <ul>
                        {displayItems.value.map((item, index) => (
                            <li
                                key={item.id}
                                class={[
                                    'focus:outline-none hover:bg-gray-50 rounded-md select-none p-2 cursor-pointer',
                                    selectedIndex.value == index ? 'bg-gray-50' : '',
                                ]}
                                onClick={() => props.onSelect?.(item.id)}
                            >
                                {props.listItem?.({ item, highlighted: selectedIndex.value == index }) || item.id}
                            </li>
                        ))}

                        {displayItems.value.length == 0 && (
                            <div class="p-2 text-sm font-medium text-gray-700">
                                {props.loading ? (
                                    <div class="flex items-center space-x-2">
                                        <NLoader size={6} />
                                        <span> Lade Ergebnisse... {/*{ $t('input.text.loading-search-results')*/}</span>
                                    </div>
                                ) : (
                                    <div>
                                        Keine Ergebnisse
                                        {/* { $t('input.text.no-search-results', { input: modelValue }) } */}
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
})
