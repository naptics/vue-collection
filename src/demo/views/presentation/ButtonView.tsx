import { createView } from '@/lib/utils/component'
import NButton from '@/lib/components/NButton'
import ComponentSection from '@/demo/components/ComponentSection'
import VariantSection from '@/demo/components/VariantSection'
import ColorGrid from '@/demo/components/ColorGrid'

export default createView('ButtonView', () => {
    return () => (
        <ComponentSection
            title="Buttons"
            subtitle="The basic building block of all our apps. They can have two sizes and different colors."
            id="buttons"
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
                            Click me
                        </NButton>
                    )}
                />
            </VariantSection>

            <VariantSection title="Loading">
                <ColorGrid
                    item={color => (
                        <NButton color={color} loading>
                            Click me
                        </NButton>
                    )}
                />
            </VariantSection>
        </ComponentSection>
    )
})
