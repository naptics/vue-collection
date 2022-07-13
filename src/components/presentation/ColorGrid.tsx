import { createComponent, createProps } from '@/utils/vue'
import { computed, type PropType } from 'vue'
import ComponentGrid, { componentGridProps } from './ComponentGrid'

export const colorGridProps = createProps({
    ...componentGridProps,
    colors: {
        type: Number,
        default: 6,
    },
    item: Function as PropType<(color: string) => JSX.Element>,
})

export default createComponent('ColorGrid', colorGridProps, props => {
    const colors = ['primary', 'secondary', 'green', 'red', 'blue', 'default']

    const selectedColors = computed(() => colors.slice(0, props.colors))

    return () => (
        <ComponentGrid cols={props.cols}>
            {selectedColors.value.map(color => (
                <div class="flex">{props.item?.(color)}</div>
            ))}
        </ComponentGrid>
    )
})
