import NLoadingIndicator from '@/lib/components/NLoadingIndicator'
import ComponentGrid from '@/demo/components/ComponentGrid'
import ComponentSection from '@/demo/components/ComponentSection'
import VariantSection from '@/demo/components/VariantSection'
import { createView } from '@/lib/utils/component'

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
