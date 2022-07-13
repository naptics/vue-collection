import type { HeroIcon } from '@/utils/utils'
import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'

export const nIconCircleProps = createProps({
    icon: {
        type: Object as PropType<HeroIcon>,
        required: true,
    },
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * The size of the circle in "tailwind units" (4 px). Can be any number.
     */
    circleSize: Number,
    /**
     * The size of the icon in "tailwind units" (4 px). Can be any number.
     */
    iconSize: Number,
    iconShade: {
        type: Number,
        default: 600,
    },
    bgShade: {
        type: Number,
        default: 100,
    },
})

const DEFAULT_CIRCLE_SIZE = 16
const SCALING_FACTOR = 0.55

export default createComponent('NIconCircle', nIconCircleProps, props => {
    let circleSize = props.circleSize
    let iconSize = props.iconSize
    if (circleSize == null) {
        if (iconSize == null) circleSize = DEFAULT_CIRCLE_SIZE
        else circleSize = iconSize / SCALING_FACTOR
    }
    if (iconSize == null) iconSize = circleSize * SCALING_FACTOR

    circleSize *= 4
    iconSize *= 4

    return () => (
        <div
            class={['flex items-center justify-center rounded-full', `bg-${props.color}-${props.bgShade}`]}
            style={`width: ${circleSize}px; height: ${circleSize}px`}
        >
            <div class={`text-${props.color}-${props.iconShade}`} style={`width: ${iconSize}px; height: ${iconSize}px`}>
                <props.icon />
            </div>
        </div>
    )
})
