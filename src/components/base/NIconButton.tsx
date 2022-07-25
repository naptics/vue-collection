import type { HeroIcon } from '@/utils/utils'
import { createComponent, createProps } from '@/utils/component'
import type { PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { nButtonProps } from './NButton'
import NTooltip, { mapTooltipProps, nToolTipPropsForImplementor } from './NTooltip'

export const nIconButtonProps = createProps({
    /**
     * The icon of the icon-button.
     */
    icon: {
        type: Function as PropType<HeroIcon>,
        required: true,
    },
    /**
     * The route of the icon-button. If this is set, the icon-button becomes a {@link RouterLink}.
     */
    route: [String, Object] as PropType<RouteLocationRaw>,
    /**
     * The color of the icon-button.
     */
    color: {
        type: String,
        default: 'default',
    },
    /**
     * The size of the icon in tailwind-units.
     */
    size: {
        type: Number,
        default: 5,
    },
    /**
     * The html attribute, which indicates the type of the button.
     */
    type: nButtonProps.type,
    /**
     * If set to `true` the icon-button is disabled and no interaction is possible.
     */
    disabled: Boolean,
    /**
     * This is called when the icon-button is clicked.
     * It is only called when the `route` prop is not set on the icon-button.
     */
    onClick: Function as PropType<() => void>,
    ...nToolTipPropsForImplementor,
})

/**
 * The `NIconButton` is a regular button which does not have any text but an icon instead.
 */
export default createComponent('NIconButton', nIconButtonProps, props => {
    const classes = () => [
        'block p-0.5 transition rounded-md focus:outline-none focus-visible:ring-2 -m-1',
        props.disabled
            ? `text-${props.color}-200 cursor-default`
            : `hover:bg-${props.color}-500 hover:bg-opacity-10 text-${props.color}-500 focus-visible:ring-${props.color}-500 cursor-pointer`,
    ]

    const content = () => <props.icon class={`w-${props.size} h-${props.size}`} />

    return () => (
        <NTooltip {...mapTooltipProps(props)}>
            {props.route ? (
                <RouterLink to={props.route} class={classes()}>
                    {content()}
                </RouterLink>
            ) : (
                <button type={props.type} disabled={props.disabled} class={classes()} onClick={props.onClick}>
                    {content()}
                </button>
            )}
        </NTooltip>
    )
})
