import { createComponent } from '../utils/component'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { computed, watch, type ComputedRef, type PropType } from 'vue'
import './NPagination.css'

export const nPaginationProps = {
    /**
     * The page number which is currently selected.
     */
    value: {
        type: Number,
        default: () => 1,
    },
    /**
     * This is called, when a new page number has been selected.
     */
    onUpdateValue: Function as PropType<(newValue: number) => void>,
    /**
     * The total pages which exists. This is needed to correctly display the selectable pages.
     */
    total: {
        type: Number,
        default: () => 1,
    },
    /**
     * If set to `true`, the pagination is displayed smaller.
     */
    small: Boolean,
    /**
     * This is called, when the visible pages, which are selectable in the pagination, have changed.
     * This is useful as only these pages can be navigated to on the next click.
     * This information can be useful for prefetching.
     */
    onVisiblePagesChanged: Function as PropType<(visiblePages: number[]) => void>,
} as const

/**
 * The `NPagination` is a styled pagination component.
 */
export default createComponent('NPagination', nPaginationProps, props => {
    const numbers = computed(() => {
        if (props.total <= 7) {
            return range(1, props.total)
        } else if (props.value <= 4) {
            return [...range(1, 5), -1, props.total]
        } else if (props.value >= props.total - 3) {
            return [1, -1, ...range(props.total - 4, props.total)]
        } else {
            return [1, -1, ...range(props.value - 1, props.value + 1), -1, props.total]
        }
    })

    watch(
        () => numbers.value,
        () => {
            const visiblePages = numbers.value.filter(value => value != -1)
            props.onVisiblePagesChanged?.(visiblePages)
        },
        { immediate: true }
    )

    const clickedNumber = (value: number) => {
        if (value <= props.total && value >= 1) props.onUpdateValue?.(value)
    }
    const next = () => clickedNumber(props.value + 1)
    const previous = () => clickedNumber(props.value - 1)

    const items: ComputedRef<PaginationItem[]> = computed(() =>
        numbers.value.map(number => {
            if (number == -1) return { label: '...', selectable: false, selected: false }
            else
                return {
                    label: `${number}`,
                    selectable: true,
                    selected: number == props.value,
                    click: () => clickedNumber(number),
                }
        })
    )

    const classesForItem = (item: PaginationItem) => [
        'pagination-item',
        item.selectable ? 'selectable ' : '',
        item.selected ? 'selected' : '',
        props.small ? '' : 'not-small',
    ]

    return () => (
        <nav class="inline-flex rounded-md shadow -space-x-px">
            <button
                class={['pagination-item selectable rounded-l-md', props.small ? '' : 'not-small']}
                onClick={previous}
            >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>

            {items.value.map((item, index) =>
                item.selectable ? (
                    <button key={index} class={classesForItem(item)} onClick={item.click}>
                        {item.label}
                    </button>
                ) : (
                    <div key={index} class={classesForItem(item)}>
                        {item.label}
                    </div>
                )
            )}

            <button class={['pagination-item selectable rounded-r-md', props.small ? '' : 'not-small']} onClick={next}>
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
        </nav>
    )
})

type PaginationItem = {
    label: string
    selectable: boolean
    selected: boolean
    click?: () => void
}

function range(from: number, to: number): number[] {
    const array = []
    for (let i = from; i <= to; i++) {
        array.push(i)
    }
    return array
}
