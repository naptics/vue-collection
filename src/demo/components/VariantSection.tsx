import { createComponent } from '@/lib/utils/component'

export const variantSectionProps = {
    title: String,
    subtitle: String,
} as const

export default createComponent('VariantSection', variantSectionProps, (props, { slots }) => {
    return () => (
        <div>
            <div class="mb-6">
                <h3 class="text-lg font-medium text-default-700"> {props.title} </h3>
                {props.subtitle && <p class="text-default-500 text-sm"> {props.subtitle} </p>}
            </div>
            <div class="border-2 border-dashed rounded-lg p-8 border-default-200 bg-white">{slots.default?.()}</div>
        </div>
    )
})
