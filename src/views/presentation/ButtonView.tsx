import { createView } from '@/utils/vue'
import NButton from '@/components/base/NButton'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'

export default createView('ButtonView', () => {
    const colors = ['primary', 'secondary', 'green', 'red', 'blue', 'default']

    return () => (
        <ComponentSection
            title="Buttons"
            subtitle="The basic building block of all our apps. They can have two sizes and different colors."
        >
            <VariantSection title="Normal">
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {colors.map(color => (
                        <div>
                            <NButton color={color}>Click me</NButton>
                        </div>
                    ))}
                </div>
            </VariantSection>

            <VariantSection title="Small">
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {colors.map(color => (
                        <div>
                            <NButton color={color} small>
                                Click me
                            </NButton>
                        </div>
                    ))}
                </div>
            </VariantSection>

            <VariantSection title="Disabled">
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {colors.map(color => (
                        <div>
                            <NButton color={color} disabled>
                                Click me
                            </NButton>
                        </div>
                    ))}
                </div>
            </VariantSection>
        </ComponentSection>
    )
})
