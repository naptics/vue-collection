import { createComponent, createProps } from '@/utils/vue'

export const variantSectionProps = createProps({
    title: String,
    subtitle: String,
})

export default createComponent('VariantSection', variantSectionProps, (props, { slots }) => {
    return () => (
        <div>
            <div class="mb-6">
                <h3 class="text-lg font-medium text-default-700"> {props.title} </h3>
                {props.subtitle && <p class="text-default-500"> {props.subtitle} </p>}
            </div>
            {slots.default?.()}
        </div>
    )
})
