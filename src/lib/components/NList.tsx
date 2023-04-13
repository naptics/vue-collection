import { createComponent } from '../utils/component'
import type { PropType } from 'vue'

export type ListItem = {
    /**
     * The title of the item.
     */
    title: string
    /**
     * The text of the item.
     */
    text?: string
}

export const nListProps = {
    /**
     * The items which are displayed in the list.
     */
    items: {
        type: Array as PropType<ListItem[]>,
        default: () => [],
    },
    /**
     * Adds the classes to the top-level element.
     */
    addClass: String,
} as const

/**
 * The `NList` displays key-value data in an appealing way.
 */
export default createComponent('NList', nListProps, props => {
    return () => (
        <dl class={props.addClass}>
            {props.items.map((item, index) => (
                <div
                    key={index}
                    class={[
                        'py-5 px-4 sm:grid sm:grid-cols-3 sm:gap-4',
                        index % 2 === 1 ? 'bg-white' : 'bg-default-50',
                    ]}
                >
                    <dt class="text-sm font-medium text-default-500">{item.title}</dt>
                    <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">{item.text}</dd>
                </div>
            ))}
        </dl>
    )
})
