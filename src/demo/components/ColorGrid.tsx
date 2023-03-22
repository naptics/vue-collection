import { createComponent, createProps } from '@/lib/utils/component'
import { computed, type PropType } from 'vue'
import ComponentGrid, { componentGridProps } from '@/demo/components/ComponentGrid'

export const colorGridProps = createProps({
    ...componentGridProps,
    colors: {
        type: Number,
        default: 6,
    },
    item: Function as PropType<(color: string, index: number) => JSX.Element>,
})

export default createComponent('ColorGrid', colorGridProps, props => {
    const colors = ['primary', 'secondary', 'green', 'red', 'yellow', 'default']

    const selectedColors = computed(() => colors.slice(0, props.colors))

    return () => (
        <ComponentGrid cols={props.cols}>
            {selectedColors.value.map((color, index) => (
                <div class="flex">{props.item?.(color, index)}</div>
            ))}
        </ComponentGrid>
    )
})
