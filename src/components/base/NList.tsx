import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'

export type ListItem = {
    title: string
    text?: string
}

export const nListProps = createProps({
    items: {
        type: Array as PropType<ListItem[]>,
        default: () => [],
    },
})

export default createComponent('NList', nListProps, props => {
    return () => (
        <dl>
            {props.items.map((item, index) => (
                <div
                    key={index}
                    class={[
                        'py-5 px-4 sm:grid sm:grid-cols-3 sm:gap-4',
                        index % 2 === 1 ? 'bg-white' : 'bg-default-50',
                    ]}
                >
                    <dt class="text-sm font-medium text-default-500">{item.title}</dt>
                    <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">{item.text}</dd>
                </div>
            ))}
        </dl>
    )
})
