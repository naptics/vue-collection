import { createComponent, createProps } from '@/utils/vue'

export const componentSectionProps = createProps({
    title: String,
    subtitle: String,
})

export default createComponent('ComponentSection', componentSectionProps, (props, { slots }) => {
    return () => (
        <>
            <div class="bg-default-50">
                <div class="px-8 py-8 max-w-4xl mx-auto">
                    <h2 class="font-bold text-4xl mb-2">{props.title}</h2>
                    <p class="text-default-500 text-xl font-light">{props.subtitle}</p>
                </div>
            </div>
            <div>
                <div class="p-8 space-y-8 max-w-4xl mx-auto">{slots.default?.()}</div>
            </div>
        </>
    )
})
