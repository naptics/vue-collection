import { isWidthBreakpoint, type TWBreakpoint } from '@/utils/breakpoints'
import { createComponent, createProps } from '@/utils/component'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
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
    /**
     * If set the heading will become a details entry when the screen is smaller than the specified breakpoint.
     */
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

export type TableRow = Record<string, TableItem> & {
    /**
     * The TableItem is used as the last element of the table and
     * merged together in one cell with the button to toggle the details.
     */
    action?: TableItem
}
const N_TABLE_ACTION_KEY = 'action'
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
     * Details can be added additionally to headings.
     * If details are set a little chevron icon is displayed at the end of each table row
     * and if clicked on it the data is displayed in a key-value fashion.
     * The values of the entries should be passed via the `items` prop
     * in the same way as if the details were normal headings.
     * Note that details can be added dynamically by adding the `breakpoint` property to the headings.
     */
    details: {
        type: Array as PropType<TableDetail[]>,
        default: () => [],
    },
    /**
     * The items of the table. They consist of an array of table rows.
     * Every tablerow is an object containing elements for the heading keys.
     * The elements can either be a primitive value or a function which returns a {@link JSX.Element}.
     * If the item should be treated as an action (e.g. icon-button to display at the end of the row)
     * the dedicated key 'action' can be used.
     * @see TableRow
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
     *      { id: 1, name: 'Hubert', status: () => <NBadge ... />, action: ... },   // Row 1
     *      { id: 2, name: 'Franzi', status: () => <NBadge ... />, action: ... }    // Row 2
     * ]
     */
    items: {
        type: Array as PropType<TableRow[]>,
        default: () => [],
    },
})

/**
 * The `NTable` is a styled html table which accepts data and displays it appropriately.
 */
export default createComponent('NTable', nTableProps, props => {
    const headings = computed(() => {
        // remove all headings which are below the breakpoint
        const headings = props.headings.filter(
            heading => !heading.breakpoint || isWidthBreakpoint(heading.breakpoint).value
        )

        // The column for actions is shown if there are details
        // or if any of the items contain an element with the action-key.
        if (showDetails.value || props.items.filter(row => row.action != null).length != 0) {
            headings.push({ key: N_TABLE_ACTION_KEY })
        }

        return headings
    })

    const details = computed(() => {
        // take all headings which are below the breakpoint
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

    // if the items change, reset all open details to closed
    // and create correct amount of booleans for all items
    watch(
        () => props.items,
        newItems => (detailsOpen.value = Array({ length: newItems.length }).map(() => false)),
        { immediate: true }
    )

    return () => (
        <div class="overflow-x-auto">
            <table class="min-w-full text-default-500 text-sm">
                <thead class="bg-default-50 ">
                    <tr>
                        {headings.value.map(heading => (
                            <th key={heading.key} scope="col" class="p-4 table-heading">
                                {heading.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {props.items.length > 0 &&
                    props.items.map((item, itemIndex) => (
                        <Fragment key={itemIndex}>
                            {/* First tbody is the actual table-row with the entries */}
                            <tbody
                                class={[
                                    'border-default-200 border-t',
                                    itemIndex % 2 === 0 ? 'bg-white' : 'bg-default-50',
                                ]}
                            >
                                <tr>
                                    {headings.value.map(heading => (
                                        <td key={itemIndex + '-' + heading.key} class="p-4">
                                            <div
                                                class={[
                                                    'flex',
                                                    heading.emph ? 'font-medium text-default-900' : '',
                                                    heading.cellClass,
                                                    heading.key == N_TABLE_ACTION_KEY
                                                        ? 'justify-end items-center space-x-3'
                                                        : '',
                                                ]}
                                            >
                                                {item[heading.key] && buildItem(item[heading.key])}

                                                {/* Add the chevron icon-button if details are present */}
                                                {heading.key == N_TABLE_ACTION_KEY && showDetails.value && (
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

                            {/* Second tbody are the details (only shown if present and opened) */}
                            {showDetails.value && isDetailsOpen(itemIndex) && (
                                <tbody class={itemIndex % 2 === 0 ? 'bg-white' : 'bg-default-50'}>
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

/**
 * Builds a JSX-Element out of the item
 */
function buildItem(item: TableItem) {
    if (typeof item == 'string' || typeof item == 'number') return <>{item}</>
    else return item()
}
