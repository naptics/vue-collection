import NIconButton from '@/lib/components/NIconButton'
import ColorGrid from '@/demo/components/ColorGrid'
import ComponentGrid from '@/demo/components/ComponentGrid'
import ComponentSection from '@/demo/components/ComponentSection'
import VariantSection from '@/demo/components/VariantSection'
import { createView } from '@/lib/utils/component'
import {
    CogIcon,
    CreditCardIcon,
    EyeIcon,
    KeyIcon,
    PencilIcon,
    RssIcon,
    ArrowTopRightOnSquareIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/24/solid'

export default createView('IconButtonView', () => {
    const icons = [CogIcon, RssIcon, KeyIcon, CreditCardIcon, PencilIcon, EyeIcon]
    const sizes = [4, 5, 6, 7, 8, 10]

    return () => (
        <ComponentSection
            title="Icon Buttons"
            subtitle="Icon Buttons are regular buttons which just have an icon and no text."
            id="icon-buttons"
        >
            <VariantSection title="Different Colors">
                <ColorGrid item={(color, index) => <NIconButton icon={icons[index]} color={color} />} />
            </VariantSection>

            <VariantSection title="Different Sizes">
                <ComponentGrid>
                    {sizes.map(size => (
                        <div class="flex items-center justify-start">
                            <NIconButton icon={ChevronDoubleRightIcon} size={size} />
                        </div>
                    ))}
                </ComponentGrid>
            </VariantSection>

            <VariantSection title="Router Links" subtitle="The Icon Button can also be used as a regular router link.">
                <ColorGrid item={color => <NIconButton icon={ArrowTopRightOnSquareIcon} route="/" color={color} />} />
            </VariantSection>
        </ComponentSection>
    )
})
