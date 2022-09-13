import NBreadcrub, { type BreadcrumbItem } from '@/components/base/NBreadcrub'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/component'
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'

export default createView('BreadcrumbView', () => {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'Overview', route: '/' },
        { label: 'Customers', route: '/' },
        { label: 'Customer Details', route: '/' },
        { label: 'Edit Customer', route: '/' },
    ]

    return () => (
        <ComponentSection
            id="breadcrumbs"
            title="Breadcrumbs"
            subtitle="Breadcrumbs can be used as a navigation in hierarchical views."
        >
            <VariantSection
                title="Default Breadcrumb"
                subtitle="Without any customization the default breadcrumb looks like this."
            >
                <NBreadcrub items={breadcrumbItems} />
            </VariantSection>

            <VariantSection title="Different Icon" subtitle="Any icon can be chosen as the sepeartor.">
                <NBreadcrub items={breadcrumbItems} iconSize={4} icon={ChevronDoubleRightIcon} />
            </VariantSection>

            <VariantSection
                title="Customize everthing"
                subtitle="The color and size of the text and icons can be customized. Additionally the items and the sepeators have custom slots."
            >
                <NBreadcrub
                    items={breadcrumbItems}
                    color="secondary"
                    textSize="text-lg"
                    seperator={() => (
                        <button
                            class="text-secondary-500 text-sm font-semibold mx-3"
                            onClick={() => window.alert('You found the custom button seperator 🕵🏽‍♂️')}
                        >
                            /
                        </button>
                    )}
                />
            </VariantSection>
        </ComponentSection>
    )
})
