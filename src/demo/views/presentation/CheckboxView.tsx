import NCheckbox from '@/lib/components/NCheckbox'
import NCheckboxLabel from '@/lib/components/NCheckboxLabel'
import ColorGrid from '@/demo/components/ColorGrid'
import ComponentSection from '@/demo/components/ComponentSection'
import VariantSection from '@/demo/components/VariantSection'
import { createView } from '@/lib/utils/component'
import { ref } from 'vue'
import { vModelForRef } from '@/lib/utils/vModel'

export default createView('CheckboxView', () => {
    const refs = Array.from({ length: 6 }, () => ref(true))

    return () => (
        <ComponentSection
            title="Checkboxes"
            subtitle="Checkboxes come in different colors and can be used on their own or together with labels."
            id="checkboxes"
        >
            <VariantSection title="On their own">
                <ColorGrid item={(color, idx) => <NCheckbox color={color} {...vModelForRef(refs[idx])} />} />
            </VariantSection>

            <VariantSection title="Disabled">
                <ColorGrid item={(color, idx) => <NCheckbox color={color} {...vModelForRef(refs[idx])} disabled />} />
            </VariantSection>

            <VariantSection title="With labels" subtitle="Checkboxes can also be toggled by clicking on the texts.">
                <ColorGrid
                    colors={2}
                    cols={2}
                    item={(color, idx) => (
                        <NCheckboxLabel
                            color={color}
                            {...vModelForRef(refs[idx])}
                            title="Choose Option"
                            description="This option will provide many advantages. For example the checkbox will be very beautifully enlightened."
                        />
                    )}
                />
            </VariantSection>

            <VariantSection title="Disabled with labels">
                <ColorGrid
                    colors={2}
                    cols={2}
                    item={(color, idx) => (
                        <NCheckboxLabel
                            color={color}
                            {...vModelForRef(refs[idx])}
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
