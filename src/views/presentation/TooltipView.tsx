import NBadge from '@/components/base/NBadge'
import NButton from '@/components/base/NButton'
import NIconButton from '@/components/base/NIconButton'
import NInput from '@/components/base/NInput'
import NTooltip from '@/components/base/NTooltip'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue-collection/component'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'

export default createView('TooltipView', () => {
    return () => (
        <ComponentSection
            id="tooltips"
            title="Tooltips"
            subtitle="Tooltips can be added to all components to display small explanations or tips to the user."
        >
            <VariantSection
                title="Customization"
                subtitle="The content of a tooltip can be a simple text or there is a slot available for customization. More properties like placement, maximum width and more can be configured."
            >
                <ComponentGrid cols={4}>
                    <div class="flex">
                        <NTooltip text="Hello tooltip!">
                            <NBadge text="Hover me" />
                        </NTooltip>
                    </div>

                    <div class="flex">
                        <NTooltip
                            content={() => (
                                <div>
                                    <h2 class="font-medium text-base"> The importance of tooltips</h2>
                                    <p>
                                        Tooltips are very important as they allow the display information conditionally
                                        on the screen.
                                    </p>
                                </div>
                            )}
                        >
                            <NBadge text="Hover me" />
                        </NTooltip>
                    </div>

                    <div class="flex">
                        <NTooltip text="Tooltip placed at «top-start»." placement="top-start">
                            <NBadge text="Hover me" />
                        </NTooltip>
                    </div>

                    <div class="flex">
                        <NTooltip text="I don't go away!" show placement="bottom-start">
                            <NBadge text="Hover me" />
                        </NTooltip>
                    </div>
                </ComponentGrid>
            </VariantSection>

            <VariantSection
                title="Out of the box"
                subtitle="The following components contain integrated tooltips out of the box."
            >
                <ComponentGrid cols={4}>
                    <div class="flex items-center">
                        <NIconButton
                            icon={ArrowTopRightOnSquareIcon}
                            tooltipText="Icon Buttons have integrated tooltips."
                        />
                    </div>
                    <div class="flex items-center">
                        <NButton tooltipText="Buttons have integrated tooltips."> Button </NButton>
                    </div>
                    <div class="flex items-center">
                        <NBadge text="Badge" tooltipText="Badges have integrated tooltips." />
                    </div>

                    <NInput name="Disabled" disabled tooltipText="Inputs have integrated tooltips." />
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
