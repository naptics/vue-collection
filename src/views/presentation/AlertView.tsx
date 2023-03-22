import type { AlertVariant } from '../../lib/components/NAlert'
import NAlert from '../../lib/components/NAlert'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue-collection/component'

export default createView('AlertView', () => {
    const variants: AlertVariant[] = ['success', 'info', 'warning', 'error']

    return () => (
        <ComponentSection
            title="Alerts"
            id="alerts"
            subtitle="Alerts can be used directly in a view or they can appear at a fixed position as a notification."
        >
            <VariantSection title="Normal Alerts">
                <ComponentGrid cols={2}>
                    {variants.map(variant => (
                        <NAlert variant={variant} text="Hello, this is an important Alert." />
                    ))}
                </ComponentGrid>
            </VariantSection>

            <VariantSection title="Hide Dismiss Button">
                <ComponentGrid cols={2}>
                    {variants.slice(0, 2).map(variant => (
                        <NAlert variant={variant} hideX text="This is undismissable." />
                    ))}
                </ComponentGrid>
            </VariantSection>

            <VariantSection title="Loading Alert">
                <ComponentGrid cols={2}>
                    <NAlert variant="loading" text="The file is currently downloading..." />
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
