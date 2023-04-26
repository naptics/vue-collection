import { createComponent } from '../utils/component'
import { computed, useCssVars } from 'vue'
import './NLoadingIndicator.css'

export const nLoadingIndicator = {
    /**
     * The color of the loading-indicator.
     */
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * The shade of the loading-indicator.
     */
    shade: {
        type: Number,
        default: 400,
    },
    /**
     * The height of the loading-indicator in px.
     */
    size: {
        type: Number,
        default: 10,
    },
} as const

/**
 * The `NLoadingIndicator` is a styled loading indicator.
 */
export default createComponent('NLoadingIndicator', nLoadingIndicator, props => {
    const gap = computed(() => (props.size / 13) * 24)

    const totalWidth = computed(() => gap.value * 2 + props.size)

    useCssVars(() => ({
        'n-loading-indicator-gap': `${gap.value}px`,
    }))

    return () => (
        <div class="lds-ellipsis" style={`height:${props.size}px;width:${totalWidth.value}px`}>
            <div
                class={`bg-${props.color}-${props.shade}`}
                style={`height:${props.size}px;width:${props.size}px;left:0px`}
            />
            <div
                class={`bg-${props.color}-${props.shade}`}
                style={`height:${props.size}px;width:${props.size}px;left:0px`}
            />
            <div
                class={`bg-${props.color}-${props.shade}`}
                style={`height:${props.size}px;width:${props.size}px;left:${gap.value}px`}
            />
            <div
                class={`bg-${props.color}-${props.shade}`}
                style={`height:${props.size}px;width:${props.size}px;left:${2 * gap.value}px`}
            />
        </div>
    )
})
