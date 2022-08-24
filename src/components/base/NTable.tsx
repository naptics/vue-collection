import { isWidthBreakpoint, type TWBreakpoint } from '@/utils/breakpoints'
import { createComponent, createProps } from '@/utils/component'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/solid'
import { computed, Fragment, ref, type PropType, watch } from 'vue'
import NIconButton from './NIconButton'
import './NTable.css'

export type TableHeading = {
    /**
     * The key of the table heading. This should match the key of the items.
     */
    key: string
    /**
     * The label of the table heading. If not set, no label is displayed.
     */
    label?: string
    /**
     * If set to `true` the whole column of this heading will be emphasized.
     */
    emph?: boolean
    /**
     * This classes will be directly set to all cells in the column of this heading.
     */
    cellClass?: string
    breakpoint?: TWBreakpoint
}

export type TableDetail = {
    /**
     * The key of the table details. This should match the key of the items.
     */
    key: string
    /**
     * The label of the table detail. If not set, no label is displayed.
     */
    label?: string
}

export type TableRow = Record<string, TableItem>
export type TableItem = string | number | (() => JSX.Element)

export const nTableProps = createProps({
    /**
     * The headings of the table. These define which columns are shown in the table and in which order.
     */
    headings: {
        type: Array as PropType<TableHeading[]>,
        required: true,
    },
    /**
     * The items of the table. They consist of an array of table rows.
     * Every tablerow is an object containing elements for the heading keys.
     * The elements can either be a primitive value or a function which returns a {@link JSX.Element}.
     * @example
     * // These headings are defined
     * const headings: TableHeading[] = [
     *    { key: 'id', label: 'ID' },
     *    { key: 'name', label: 'Name' },
     *    { key: 'status', label: 'Status' }
     * ]
     *
     * // Appropriate rows for these headings
     * const items: TableRow[] = [
     *      { id: 1, name: 'Hubert', status: () => <NBadge ... /> },   // Row 1
     *      { id: 2, name: 'Franzi', status: () => <NBadge ... /> }    // Row 2
     * ]
     */
    items: {
        type: Array as PropType<TableRow[]>,
        default: () => [],
    },
    details: {
        type: Array as PropType<TableDetail[]>,
        default: () => [],
    },
})

const DETAILS_BUTTON_KEY = 'nTableDetailsButton'

/**
 * The `NTable` is a styled html table which accepts data and displays it appropriately.
 */
export default createComponent('NTable', nTableProps, props => {
    function buildItem(item: TableItem) {
        if (typeof item == 'string' || typeof item == 'number') return <>{item}</>
        else return item()
    }

    const headings = computed(() => {
        const headings = props.headings.filter(
            heading => !heading.breakpoint || isWidthBreakpoint(heading.breakpoint).value
        )
        if (details.value.length > 0) headings.push({ key: DETAILS_BUTTON_KEY, cellClass: 'flex-row-reverse' })
        return headings
    })

    const details = computed(() => {
        const details = props.headings.filter(
            heading => heading.breakpoint && !isWidthBreakpoint(heading.breakpoint).value
        )
        details.push(...props.details)
        return details
    })
    const showDetails = computed(() => details.value.length > 0)

    const detailsOpen = ref<boolean[]>([])
    const isDetailsOpen = (index: number) => detailsOpen.value[index] || false
    const toggleDetailsOpen = (index: number) => (detailsOpen.value[index] = !detailsOpen.value[index])

    watch(
        () => props.items,
        newItems => (detailsOpen.value = Array({ length: newItems.length }).map(() => false)),
        { immediate: true }
    )

    return () => (
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="bg-default-50 ">
                    <tr>
                        {headings.value.map(heading => (
                            <th key={heading.key} scope="col" class="table-padding table-heading">
                                {heading.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {props.items.length > 0 &&
                    props.items.map((item, itemIndex) => (
                        <Fragment key={itemIndex}>
                            <tbody class="text-default-500 text-sm border-default-200 border-t">
                                <tr class={itemIndex % 2 === 0 ? 'bg-white' : 'bg-default-50'}>
                                    {headings.value.map(heading => (
                                        <td key={itemIndex + '-' + heading.key} class="table-padding">
                                            <div
                                                class={[
                                                    'flex',
                                                    heading.emph ? 'font-medium text-default-900' : '',
                                                    heading.cellClass,
                                                ]}
                                            >
                                                {heading.key != DETAILS_BUTTON_KEY ? (
                                                    item[heading.key] && buildItem(item[heading.key])
                                                ) : (
                                                    <NIconButton
                                                        icon={
                                                            isDetailsOpen(itemIndex) ? ChevronDownIcon : ChevronUpIcon
                                                        }
                                                        onClick={() => toggleDetailsOpen(itemIndex)}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>

                            {showDetails.value && isDetailsOpen(itemIndex) && (
                                <tbody
                                    class={[
                                        itemIndex % 2 === 0 ? 'bg-white' : 'bg-default-50',
                                        'text-default-500 text-sm ',
                                    ]}
                                >
                                    {details.value.map((detail, detailIndex) => (
                                        <tr key={`detail-${detailIndex}`}>
                                            <td
                                                class={[
                                                    'table-heading px-4 py-1',
                                                    details.value.length - 1 == detailIndex ? 'pb-4' : '',
                                                ]}
                                            >
                                                {detail.label}
                                            </td>
                                            <td
                                                class={[
                                                    'px-4 py-1',
                                                    details.value.length - 1 == detailIndex ? 'pb-4' : '',
                                                ]}
                                                colspan={headings.value.length - 1}
                                            >
                                                {item[detail.key] && buildItem(item[detail.key])}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </Fragment>
                    ))}
            </table>
        </div>
    )
})
