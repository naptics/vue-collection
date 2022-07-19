import { createComponent, createProps } from '@/utils/component'
import type { PropType } from 'vue'
import './NTable.css'

export type TableHeading = {
    /**
     * The key of the table heading. This should match the key of the items.
     */
    key: string
    /**
     * The label of the table heading. If not set, not label is displayed.
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
})

/**
 * The `NTable` is a styled html table which accepts data and displays it appropriately.
 */
export default createComponent('NTable', nTableProps, props => {
    function buildItem(item: TableItem) {
        if (typeof item == 'string' || typeof item == 'number') return <>{item}</>
        else return item()
    }

    return () => (
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-default-200">
                <thead class="bg-default-50">
                    <tr>
                        {props.headings.map(heading => (
                            <th
                                key={heading.key}
                                scope="col"
                                class="table-padding text-left text-xs font-medium text-default-500 uppercase tracking-wider"
                            >
                                {heading.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {props.items.length > 0 && (
                    <tbody>
                        {props.items.map((item, itemIndex) => (
                            <tr key={itemIndex} class={itemIndex % 2 === 0 ? 'bg-white' : 'bg-default-50'}>
                                {props.headings.map(heading => (
                                    <td
                                        key={itemIndex + '-' + heading.key}
                                        class="table-padding text-sm text-default-500"
                                    >
                                        <div
                                            class={[
                                                'flex',
                                                heading.emph ? 'font-medium text-default-900' : '',
                                                heading.cellClass,
                                            ]}
                                        >
                                            {item[heading.key] && buildItem(item[heading.key])}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    )
})
