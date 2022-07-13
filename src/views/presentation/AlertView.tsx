import type { AlertVariant } from '@/components/base/NAlert'
import NAlert from '@/components/base/NAlert'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue'

export default createView('AlertView', () => {
    const variants: AlertVariant[] = ['success', 'info', 'warning', 'error']

    return () => (
        <ComponentSection
            title="Alerts"
            subtitle="Alerts can be used directly in a view or they can appear at a fixed position as a notification."
        >
            <VariantSection title="Normal Alerts">
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {variants.map(variant => (
                        <NAlert variant={variant} text="Hello, this is an important Alert." />
                    ))}
                </div>
            </VariantSection>

            <VariantSection title="Hide Dismiss Button">
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {variants.slice(0, 2).map(variant => (
                        <NAlert variant={variant} hideX text="This is undismissable." />
                    ))}
                </div>
            </VariantSection>

            <VariantSection title="Loading Alert">
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <NAlert variant="loading" text="The file is currently downloading..." />
                </div>
            </VariantSection>
        </ComponentSection>
    )
})
