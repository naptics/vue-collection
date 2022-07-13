import NCheckbox from '@/components/base/NCheckbox'
import NCheckboxLabel from '@/components/base/NCheckboxLabel'
import ColorGrid from '@/components/presentation/ColorGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView, refAsVModel } from '@/utils/vue'
import { ref, type Ref } from 'vue'

export default createView('CheckboxView', () => {
    const colors = ['primary', 'secondary', 'green', 'red', 'blue', 'default']
    const refs: Record<string, Ref<boolean>> = {}
    colors.forEach(color => (refs[color] = ref(true)))

    return () => (
        <ComponentSection
            title="Checkboxes"
            subtitle="Checkboxes come in different colors and can be used on their own or together with labels."
        >
            <VariantSection title="On their own">
                <ColorGrid item={color => <NCheckbox color={color} {...refAsVModel(refs[color])} />} />
            </VariantSection>

            <VariantSection title="Disabled">
                <ColorGrid item={color => <NCheckbox color={color} {...refAsVModel(refs[color])} disabled />} />
            </VariantSection>

            <VariantSection title="With labels" subtitle="Checkboxes can also be toggled by clicking on the texts.">
                <ColorGrid
                    colors={2}
                    cols={2}
                    item={color => (
                        <NCheckboxLabel
                            color={color}
                            {...refAsVModel(refs[color])}
                            title="Choose Option"
                            description="This option will provide many advantages."
                        />
                    )}
                />
            </VariantSection>

            <VariantSection title="Disabled with labels">
                <ColorGrid
                    colors={2}
                    cols={2}
                    item={color => (
                        <NCheckboxLabel
                            color={color}
                            {...refAsVModel(refs[color])}
                            title="Choose Option"
                            description="This option will provide many advantages."
                            disabled
                        />
                    )}
                />
            </VariantSection>
        </ComponentSection>
    )
})
