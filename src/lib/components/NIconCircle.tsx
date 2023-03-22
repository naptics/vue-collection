import type { HeroIcon } from '@/lib/utils/utils'
import { createComponent, createProps } from '@/lib/utils/component'
import type { PropType } from 'vue'

export const nIconCircleProps = createProps({
    /**
     * The icon of the icon-circle.
     */
    icon: {
        type: Function as PropType<HeroIcon>,
        required: true,
    },
    /**
     * The color of the icon-circle.
     */
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * The size of the circle in "tailwind units" (4 px).
     * Tailwind classes are used for the size, so any number can be passed.
     * If the `iconSize` is not set, it will be adjusted automatically.
     */
    circleSize: Number,
    /**
     * The size of the icon in "tailwind units" (4 px).
     * No tailwind classes are used for the size, so any number can be passed.
     * If the `circleSize` is not set, it will be adjusted automatically.
     */
    iconSize: Number,
    /**
     * The shade of the icon.
     */
    iconShade: {
        type: Number,
        default: 600,
    },
    /**
     * The shade of the background.
     */
    bgShade: {
        type: Number,
        default: 100,
    },
})

const DEFAULT_CIRCLE_SIZE = 16
const SCALING_FACTOR = 0.55

/**
 * The `NIconCircle` is an icon with a colored circle around it.
 */
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
