import { createComponent, createProps } from '@/utils/vue'
import { computed, watch } from 'vue'
import './NLoader.css'

export const nLoaderProps = createProps({
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

export default createComponent('NLoader', nLoaderProps, props => {
    const gap = computed(() => (props.size / 13) * 24)

    const totalWidth = computed(() => gap.value * 2 + props.size)

    watch(
        () => gap.value,
        newGap => document.documentElement.style.setProperty('--hloader-ellipsis-gap', newGap + 'px'),
        { immediate: true }
    )

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
