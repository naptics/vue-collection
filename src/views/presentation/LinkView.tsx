import NLink from '@/lib/components/NLink'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue-collection/component'

export default createView('LinkView', () => {
    const hi = () => window.alert('hello')

    return () => (
        <ComponentSection
            id="links"
            title="Links"
            subtitle="Links are styled texts which can be used as links or regular buttons."
        >
            <VariantSection title="Normal Links">
                <ComponentGrid cols={4}>
                    <div>
                        <NLink text="Privacy Policy" route="/" />
                    </div>
                    <div>
                        <NLink text="Privacy Policy" route="/" shade={200} />
                    </div>
                    <div>
                        <NLink text="Privacy Policy" route="/" color="secondary" shade={200} />
                    </div>
                    <div>
                        <NLink text="Privacy Policy" route="/" color="secondary" />
                    </div>
                </ComponentGrid>
            </VariantSection>
            <VariantSection title="Button Links" subtitle="Sometimes it can be useful to style a button as a link.">
                <ComponentGrid cols={4}>
                    <div>
                        <NLink text="Fake Link" onClick={hi} />
                    </div>
                    <div>
                        <NLink text="Fake Link" onClick={hi} shade={200} />
                    </div>
                    <div>
                        <NLink text="Fake Link" onClick={hi} color="secondary" shade={200} />
                    </div>
                    <div>
                        <NLink text="Fake Link" onClick={hi} color="secondary" />
                    </div>
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
