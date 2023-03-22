import { createComponent, createProps } from '../utils/component'
import { computed, type PropType } from 'vue'
import NLoadingIndicator from './NLoadingIndicator'
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
     * If set to `true` the button will show a loading animation.
     * Setting `loading` to `true` will also disable the button.
     */
    loading: Boolean,
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
    const isDisabled = computed(() => props.loading || props.disabled)

    return () => (
        <NTooltip {...mapTooltipProps(props)}>
            <button
                disabled={isDisabled.value}
                type={props.type}
                class={[
                    `block w-full font-medium rounded-md focus:outline-none focus-visible:ring-2 shadow text-${props.color}-900 relative`,
                    isDisabled.value
                        ? `bg-${props.color}-100 text-opacity-20 cursor-default`
                        : `bg-${props.color}-200 hover:bg-${props.color}-300 focus-visible:ring-${props.color}-500`,

                    props.small ? 'py-1 px-2 text-xs' : 'py-2 px-4 text-sm',
                ]}
                onClick={props.onClick}
            >
                <span class={{ 'opacity-10': props.loading }}>{slots.default?.()}</span>
                {props.loading && (
                    <div class="absolute inset-0 flex items-center justify-center opacity-50">
                        <NLoadingIndicator color={props.color} size={props.small ? 4 : 6} shade={600} />
                    </div>
                )}
            </button>
        </NTooltip>
    )
})
