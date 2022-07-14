import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export const nTableActionProps = createProps({
    route: [String, Object] as PropType<RouteLocationRaw>,
    text: String,
    type: {
        type: String as PropType<'submit' | 'button' | 'reset'>,
        default: 'button',
    },
    onClick: Function as PropType<() => void>,
})

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
