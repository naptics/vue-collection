import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'
import './NTable.css'

export type TableHeading = {
    key: string
    label?: string
    emph?: boolean
    cellClass?: string
}

export type TableItem = string | (() => JSX.Element)

export const nTableProps = createProps({
    headings: {
        type: Array as PropType<TableHeading[]>,
        required: true,
    },
    items: {
        type: Array as PropType<Record<string, TableItem>[]>,
        default: () => [],
    },
})

export default createComponent('NTable', nTableProps, props => {
    function buildItem(item: TableItem) {
        if (typeof item == 'string') return <>{item}</>
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
