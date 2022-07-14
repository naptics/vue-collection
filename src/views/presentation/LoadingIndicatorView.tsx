import NLoadingIndicator from '@/components/base/NLoadingIndicator'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue'

export default createView('NLoadingIndicator', () => {
    const sizes = [4, 6, 8, 10, 12, 14]

    return () => (
        <ComponentSection
            title="Loading Indicator"
            subtitle="A loading indicator which helps to keep the user patient."
            id="loading-indicators"
        >
            <VariantSection title="Different colors and shades">
                <ComponentGrid>
                    <NLoadingIndicator shade={700} />
                    <NLoadingIndicator shade={400} />
                    <NLoadingIndicator shade={100} />
                    <NLoadingIndicator color="secondary" shade={100} />
                    <NLoadingIndicator color="secondary" shade={400} />
                    <NLoadingIndicator color="secondary" shade={700} />
                </ComponentGrid>
            </VariantSection>

            <VariantSection title="Different sizes">
                <ComponentGrid>
                    {sizes.map(size => (
                        <div class="flex items-center">
                            <NLoadingIndicator size={size} />
                        </div>
                    ))}
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
