import { createComponent } from '@/lib/utils/component'
import { computed, type PropType } from 'vue'

export const componentGridProps = {
    cols: {
        type: Number as PropType<2 | 4 | 6 | 8>,
        default: 6,
    },
} as const

export default createComponent('ComponentGrid', componentGridProps, (props, { slots }) => {
    const classes = computed(() => {
        switch (props.cols) {
            case 2:
                return 'grid-cols-1 sm:grid-cols-2'
            case 4:
                return 'grid-cols-2 sm:grid-cols-4'
            case 8:
                return 'grid-cols-4 sm:grid-cols-8'
            default:
                return 'grid-cols-3 sm:grid-cols-6'
        }
    })

    return () => <div class={`grid gap-4 ${classes.value}`}>{slots.default?.()}</div>
})
