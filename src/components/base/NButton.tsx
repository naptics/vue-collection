import { createComponent, createProps } from '@/utils/component'
import type { PropType } from 'vue'
import NTooltip, { mapTooltipProps, nToolTipPropsForImplementor } from './NTooltip'

export const nButtonProps = createProps({
    /**
     * The color of the button.
     */
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * The html attribute, which indicates the type of the button.
     */
    type: {
        type: String as PropType<'submit' | 'button' | 'reset'>,
        default: 'button',
    },
    /**
     * If set to `true` the button is disabled and no interaction is possible.
     */
    disabled: Boolean,
    /**
     * If set to `true` the button will appear smaller.
     */
    small: Boolean,
    /**
     * This is called, when the button is clicked.
     */
    onClick: Function as PropType<() => void>,
    ...nToolTipPropsForImplementor,
})

/**
 * The `NButton` is a styled button.
 */
export default createComponent('NButton', nButtonProps, (props, { slots }) => {
    return () => (
        <NTooltip {...mapTooltipProps(props)}>
            <button
                disabled={props.disabled}
                type={props.type}
                class={[
                    `font-medium rounded-md focus:outline-none focus-visible:ring-2 shadow text-${props.color}-900`,
                    !props.disabled
                        ? `bg-${props.color}-200 hover:bg-${props.color}-300 focus-visible:ring-${props.color}-500`
                        : `bg-${props.color}-100 text-opacity-20 cursor-default`,
                    props.small ? 'py-1 px-2 text-xs' : 'py-2 px-4 text-sm',
                ]}
                onClick={props.onClick}
            >
                {slots.default?.()}
            </button>
        </NTooltip>
    )
})
