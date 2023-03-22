import NDropdown, { type DropdownItem } from '@/lib/components/NDropdown'
import ComponentGrid from '@/demo/components/ComponentGrid'
import ComponentSection from '@/demo/components/ComponentSection'
import VariantSection from '@/demo/components/VariantSection'
import { createView } from '@/lib/utils/component'
import { MenuButton } from '@headlessui/vue'
import { ArrowDownOnSquareIcon, ShareIcon } from '@heroicons/vue/24/solid'

export default createView('DropdownView', () => {
    const base: DropdownItem[] = [{ label: 'Save File' }, { label: 'Share File' }]
    const multiple: DropdownItem[][] = [base, [{ label: 'Logout', route: '/logout' }, { label: 'Profile' }]]
    const icons: DropdownItem[] = [
        { label: 'Save File', icon: ArrowDownOnSquareIcon },
        { label: 'Share File', icon: ShareIcon, route: '/share' },
    ]

    const links: DropdownItem[][] = [
        [{ label: 'Normal Action' }],
        [
            { label: 'Route', route: '/link' },
            { label: 'Other Route', route: '/link2' },
        ],
    ]

    return () => (
        <ComponentSection
            title="Dropdowns"
            subtitle="Dropdowns can be used to group multiple actions together."
            id="dropdowns"
        >
            <VariantSection
                title="Different Contents"
                subtitle="The content can be selected using the mouse or the arrow keys. The items can either trigger an action or be a router link."
            >
                <ComponentGrid cols={4}>
                    <NDropdown title="Basic Dropdown" items={base} />
                    <NDropdown title="Multiple Sections" items={multiple} />
                    <NDropdown title="Action Icons" items={icons} />
                    <NDropdown title="Router Links" items={links} />
                </ComponentGrid>
            </VariantSection>

            <VariantSection
                title="Customization"
                subtitle="Dropdowns can be disabled and configured to be right aligned. For further customized there is a slot for a custom button."
            >
                <ComponentGrid cols={4}>
                    <NDropdown title="Disabled" disabled />
                    <NDropdown title="Right Aligned" right items={base} />
                    <div class="flex items-center justify-center">
                        <NDropdown items={base} button={() => <MenuButton> Custom Button</MenuButton>} />
                    </div>
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
