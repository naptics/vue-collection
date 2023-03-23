import { createComponent, createProps } from '../utils/component'
import type { TWTextSize } from '../utils/tailwind'
import { computed, type PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export const nLinkProps = createProps({
    /**
     * The text of the link. Can also be set in the default slot.
     */
    text: String,
    /**
     * The route of the link. If this is set,
     * the link becomes a {@link RouterLink} and does not emit the `onClick` event.
     */
    route: [Object, String] as PropType<RouteLocationRaw>,
    /**
     * The color of the link.
     */
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * The text size, a standard tailwind text-size class.
     */
    textSize: String as PropType<TWTextSize>,
    /**
     * The shade of the link.
     */
    shade: {
        type: Number,
        default: 500,
    },
    /**
     * This is called when the link is clicked but only, if the `route` prop is not set.
     * If the `route` prop is not set, the link will act as a regular button.
     */
    onClick: Function as PropType<() => void>,
})

/**
 * The `NLink` is a styled text which can be used as a {@link RouterLink} or a regular button.
 */
export default createComponent('NLink', nLinkProps, (props, { slots }) => {
    const hoverShade = computed(() => {
        const shade = props.shade
        if (shade <= 500) return shade + 100
        else return shade - 200
    })

    const classes = computed(() => [
        'font-medium focus:outline-none focus-visible:ring-2 rounded-sm ring-offset-2 hover:underline text-left',
        `${props.textSize} text-${props.color}-${props.shade} hover:text-${props.color}-${hoverShade.value} focus-visible:ring-${props.color}-${props.shade}`,
    ])

    return () =>
        props.route ? (
            <RouterLink to={props.route} class={classes.value}>
                {slots.default?.() || props.text}
            </RouterLink>
        ) : (
            <button onClick={props.onClick} class={classes.value}>
                {slots.default?.() || props.text}
            </button>
        )
})
