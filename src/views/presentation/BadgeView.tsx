import NBadge from '@/lib/components/NBadge'
import ColorGrid from '@/components/presentation/ColorGrid'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue-collection/component'

export default createView('BadgeView', () => {
    const textSizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl']
    const shades = [100, 200, 400, 600, 800, 900]
    const textShades = [900, 900, 900, 50, 50, 50]

    return () => (
        <ComponentSection
            title="Badges"
            subtitle="Badges wrap a small text. They come in multiple sizes, colors and shades."
            id="badges"
        >
            <VariantSection title="Default Size">
                <ColorGrid item={color => <NBadge color={color}>naptics</NBadge>} />
            </VariantSection>

            <VariantSection title="With lowercase">
                <ColorGrid
                    item={color => (
                        <NBadge color={color} allCaps={false}>
                            Hello World
                        </NBadge>
                    )}
                />
            </VariantSection>

            <VariantSection
                title="Different Text Sizes"
                subtitle="All text-sizes from text-xs to text-2xl are available."
            >
                <ComponentGrid>
                    {textSizes.map(size => (
                        <div class="flex justify-start items-center">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <NBadge text="Sizes" textSize={size as any} />
                        </div>
                    ))}
                </ComponentGrid>
            </VariantSection>

            <VariantSection
                title="Different Shades"
                subtitle="The shade of the background and the shade of the text can be adjusted individually."
            >
                <ComponentGrid>
                    {shades.map((shade, index) => (
                        <div class="flex">
                            <NBadge text="Shades" color="secondary" shade={shade} textShade={textShades[index]} />
                        </div>
                    ))}
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
