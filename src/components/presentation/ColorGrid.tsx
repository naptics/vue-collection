import { createComponent, createProps } from '@/utils/vue'
import { computed, type PropType } from 'vue'

export const colorGridProps = createProps({
    colors: {
        type: Number,
        default: 6,
    },
    gridCols: {
        type: String,
        default: 'grid-cols-3 sm:grid-cols-6',
    },
    item: Function as PropType<(color: string) => JSX.Element>,
})

export default createComponent('ColorGrid', colorGridProps, props => {
    const colors = ['primary', 'secondary', 'green', 'red', 'blue', 'default']

    const selectedColors = computed(() => colors.slice(0, props.colors))

    return () => (
        <div class={`grid gap-4 ${props.gridCols}`}>
            {selectedColors.value.map(color => (
                <div>{props.item?.(color)}</div>
            ))}
        </div>
    )
})
