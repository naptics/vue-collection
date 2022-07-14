import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'

export const nBadgeProps = createProps({
    text: String,
    textSize: {
        type: String as PropType<'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl'>,
        default: 'text-sm',
    },
    color: {
        type: String,
        default: 'primary',
    },
    shade: {
        type: Number,
        default: 200,
    },
    textShade: {
        type: Number,
        default: 900,
    },
    allCaps: {
        type: Boolean,
        default: true,
    },
})

export default createComponent('NBadge', nBadgeProps, (props, { slots }) => {
    return () => (
        <div
            class={[
                'px-2 py-1 rounded-md font-semibold shadow',
                `${props.textSize} bg-${props.color}-${props.shade} text-${props.color}-${props.textShade}`,
                props.allCaps ? 'uppercase' : '',
            ]}
        >
            {slots.default?.() || props.text}
        </div>
    )
})
