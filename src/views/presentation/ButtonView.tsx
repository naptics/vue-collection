import { createView } from '@/utils/vue'
import NButton from '@/components/base/NButton'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import ColorGrid from '@/components/presentation/ColorGrid'

export default createView('ButtonView', () => {
    return () => (
        <ComponentSection
            title="Buttons"
            subtitle="The basic building block of all our apps. They can have two sizes and different colors."
        >
            <VariantSection title="Normal">
                <ColorGrid item={color => <NButton color={color}>Click me</NButton>} />
            </VariantSection>

            <VariantSection title="Small">
                <ColorGrid
                    item={color => (
                        <NButton color={color} small>
                            Click me
                        </NButton>
                    )}
                />
            </VariantSection>

            <VariantSection title="Disabled">
                <ColorGrid
                    item={color => (
                        <NButton color={color} disabled>
                            {' '}
                            Click me{' '}
                        </NButton>
                    )}
                />
            </VariantSection>
        </ComponentSection>
    )
})
