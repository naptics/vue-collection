import { createComponent, createProps } from '@/lib/utils/component'
import type { PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { nButtonProps } from './NButton'

export const nTableActionProps = createProps({
    /**
     * The route of the action. If set the component will be a {@link RouterLink}.
     */
    route: [String, Object] as PropType<RouteLocationRaw>,
    /**
     * The text of the action.
     */
    text: String,
    /**
     * The html attribute, which indicates the type of the button.
     */
    type: nButtonProps.type,
    /**
     * This is called when the action is clicked.
     * It is only called when the `route` prop is not set on the action.
     */
    onClick: Function as PropType<() => void>,
})

/**
 * The `NTableAction` is a button or {@link RouterLink} which is styled to fit into a table.
 * It is basically styled as an emphasized text in the table.
 */
export default createComponent('NTableAction', nTableActionProps, (props, { slots }) => {
    const content = () => slots.default?.() || <>{props.text}</>

    const classes =
        'text-left font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-default-900 rounded-sm ring-offset-2 text-default-900 hover:underline hover:text-default-700'

    return () =>
        props.route ? (
            <RouterLink to={props.route} class={classes}>
                {content()}
            </RouterLink>
        ) : (
            <button type={props.type} class={classes} onClick={props.onClick}>
                {content()}
            </button>
        )
})
