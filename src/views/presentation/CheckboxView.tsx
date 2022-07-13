import NCheckbox from '@/components/base/NCheckbox'
import NCheckboxLabel from '@/components/base/NCheckboxLabel'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView, refAsVModel } from '@/utils/vue'
import { ref, type Ref } from 'vue'

export default createView('CheckboxView', () => {
    const colors = ['primary', 'secondary', 'green', 'red', 'blue', 'default']
    const onlyTwo = ['primary', 'secondary']

    const refs: Record<string, Ref<boolean>> = {}
    colors.forEach(color => (refs[color] = ref(true)))

    return () => (
        <ComponentSection
            title="Checkboxes"
            subtitle="Checkboxes come in different colors and can be used on their own or together with labels."
        >
            <VariantSection title="On their own">
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {colors.map(color => (
                        <div>
                            <NCheckbox color={color} {...refAsVModel(refs[color])} />
                        </div>
                    ))}
                </div>
            </VariantSection>

            <VariantSection title="Disabled">
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {colors.map(color => (
                        <div>
                            <NCheckbox color={color} {...refAsVModel(refs[color])} disabled />
                        </div>
                    ))}
                </div>
            </VariantSection>

            <VariantSection title="With labels" subtitle="Checkboxes can also be toggled by clicking on the texts.">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {onlyTwo.map(color => (
                        <div>
                            <NCheckboxLabel
                                color={color}
                                {...refAsVModel(refs[color])}
                                title="Choose Option"
                                description="This option will provide many advantages."
                            />
                        </div>
                    ))}
                </div>
            </VariantSection>

            <VariantSection title="Disabled with labels">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {onlyTwo.map(color => (
                        <div>
                            <NCheckboxLabel
                                color={color}
                                {...refAsVModel(refs[color])}
                                title="Choose Option"
                                description="This option will provide many advantages."
                                disabled
                            />
                        </div>
                    ))}
                </div>
            </VariantSection>
        </ComponentSection>
    )
})
