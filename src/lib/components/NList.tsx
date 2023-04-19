import { createComponent } from '../utils/component'
import type { PropType } from 'vue'

export type ListItem = {
    /**
     * The title of the item. Accepts either string or a function returning a JSX element.
     */
    title: string | (() => JSX.Element)
    /**
     * The text of the item. Accepts either string or a function returning a JSX element.
     */
    text?: string | (() => JSX.Element)
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
     * Adds the classes to all title elements (on the left side).
     */
    titleClass: String,
    /**
     * Adds the classese to all text elements (on the right side).
     */
    textClass: String,
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
                    <dt class={`text-sm font-medium text-default-500 ${props.titleClass}`}>
                        {buildElement(item.title)}
                    </dt>
                    <dd class={`mt-1 text-sm sm:mt-0 sm:col-span-2 ${props.textClass}`}>{buildElement(item.text)}</dd>
                </div>
            ))}
        </dl>
    )
})

function buildElement(element: string | undefined | (() => JSX.Element)): JSX.Element {
    if (typeof element === 'function') return element()
    else return <>{element}</>
}
