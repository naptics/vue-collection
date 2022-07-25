import { createComponent, createProps } from '@/utils/component'
import type { TWTextSize } from '@/utils/utils'
import type { PropType } from 'vue'
import NTooltip, { mapTooltipProps, nToolTipPropsForImplementor } from './NTooltip'

export const nBadgeProps = createProps({
    /**
     * The text of the badge. Can alternatively be passed in the default slot.
     */
    text: String,
    /**
     * The text size, a standard tailwind text-size class.
     */
    textSize: {
        type: String as PropType<TWTextSize>,
        default: 'text-sm',
    },
    /**
     * The color of the badge.
     */
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * The background shade of the badge.
     */
    shade: {
        type: Number,
        default: 200,
    },
    /**
     * The text shade of the badge.
     */
    textShade: {
        type: Number,
        default: 900,
    },
    /**
     * If set to `true` the badges text is all-caps. Default is `true`.
     */
    allCaps: {
        type: Boolean,
        default: true,
    },
    ...nToolTipPropsForImplementor,
})

/**
 * The `NBadge` is a styled element to wrap a text.
 */
export default createComponent('NBadge', nBadgeProps, (props, { slots }) => {
    return () => (
        <NTooltip {...mapTooltipProps(props)}>
            <div
                class={[
                    'px-2 py-1 rounded-md font-semibold shadow',
                    `${props.textSize} bg-${props.color}-${props.shade} text-${props.color}-${props.textShade}`,
                    props.allCaps ? 'uppercase' : '',
                ]}
            >
                {slots.default?.() || props.text}
            </div>
        </NTooltip>
    )
})
