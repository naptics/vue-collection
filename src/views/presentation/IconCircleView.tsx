import NIconCircle from '@/lib/components/NIconCircle'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/lib/utils/component'
import { FireIcon } from '@heroicons/vue/24/solid'

export default createView('IconCircleView', () => {
    return () => (
        <ComponentSection title="Icon Circles" subtitle="Just a regular icon in a circle." id="icon-circles">
            <VariantSection
                title="Unlimited possibilities"
                subtitle="The color, circle size, icon size and the shades of icon and background can be customized."
            >
                <ComponentGrid>
                    <div class="flex items-center">
                        <NIconCircle icon={FireIcon} />
                    </div>
                    <div class="flex items-center">
                        <NIconCircle icon={FireIcon} color="red" />
                    </div>
                    <div class="flex items-center">
                        <NIconCircle icon={FireIcon} color="red" bgShade={700} iconShade={50} />
                    </div>
                    <div class="flex items-center">
                        <NIconCircle icon={FireIcon} color="red" circleSize={16} iconSize={4} />
                    </div>
                    <div class="flex items-center">
                        <NIconCircle icon={FireIcon} color="red" circleSize={16} iconSize={14} />
                    </div>
                    <div class="flex items-center">
                        <NIconCircle icon={FireIcon} color="red" iconSize={6} />
                    </div>
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
