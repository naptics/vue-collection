import type { HeroIcon } from '@/utils/utils'
import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export const nIconButtonProps = createProps({
    icon: {
        type: Object as PropType<HeroIcon>,
        required: true,
    },
    link: [String, Object] as PropType<RouteLocationRaw>,
    color: {
        type: String,
        default: 'default',
    },
    size: {
        type: Number,
        default: 5,
    },
    type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
    },
    disabled: Boolean,
    onClick: Function as PropType<() => void>,
})

export default createComponent('NIconButton', nIconButtonProps, props => {
    const classes = () => [
        'p-0.5 transition rounded-md focus:outline-none focus-visible:ring-2 -m-1',
        props.disabled
            ? `text-${props.color}-200 cursor-default`
            : `hover:bg-${props.color}-500 hover:bg-opacity-10 text-${props.color}-500 focus-visible:ring-${props.color}-500 cursor-pointer`,
    ]

    const content = () => <props.icon class={`w-${props.size} h-${props.size}`} />

    return () =>
        props.link ? (
            <RouterLink to={props.link} class={classes()}>
                {content()}
            </RouterLink>
        ) : (
            <button type={props.type} disabled={props.disabled} class={classes()} onClick={props.onClick}>
                {content()}
            </button>
        )
})
