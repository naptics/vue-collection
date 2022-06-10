import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'

export const nButtonProps = createProps({
    color: {
        type: String,
        default: 'primary',
    },
    type: {
        type: String as PropType<'submit' | 'button' | 'reset'>,
        default: 'button',
    },
    disabled: Boolean,
    small: Boolean,
    onClick: Function as PropType<() => void>,
})

export default createComponent('NButton', nButtonProps, (props, { slots }) => {
    return () => (
        <button
            disabled={props.disabled}
            type={props.type}
            class={[
                'font-medium rounded-md focus:outline-none focus-visible:ring-2 shadow ',
                !props.disabled
                    ? `bg-${props.color}-200 hover:bg-${props.color}-300 text-${props.color}-900 focus-visible:ring-${props.color}-500`
                    : `bg-${props.color}-100 text-${props.color}-200 cursor-default`,
                props.small ? 'py-1 px-2 text-xs' : 'py-2 px-4 text-sm',
            ]}
        >
            {slots.default?.()}
        </button>
    )
})
