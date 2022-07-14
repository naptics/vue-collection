import { createComponent, createProps } from '@/utils/vue'
import { computed, useCssVars } from 'vue'
import './NLoadingIndicator.css'

export const nLoadingIndicator = createProps({
    color: {
        type: String,
        default: 'primary',
    },
    shade: {
        type: Number,
        default: 400,
    },
    /**
     * The height of the loader in px.
     */
    size: {
        type: Number,
        default: 10,
    },
})

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
