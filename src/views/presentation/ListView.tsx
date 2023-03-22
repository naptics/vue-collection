import type { ListItem } from '@/lib/components/NList'
import NList from '@/lib/components/NList'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue-collection/component'

export default createView('ListView', () => {
    const items: ListItem[] = [
        { title: 'Name', text: 'Michael Scott' },
        { title: 'Profession', text: 'Nerd' },
        { title: 'Title', text: 'Dr. phil.' },
        { title: 'Date Of Birth', text: '14.10.1982' },
    ]

    return () => (
        <ComponentSection
            title="List"
            subtitle="A component to display key-value information in a simple and neat way."
            id="lists"
        >
            <VariantSection title="Display Information">
                <NList items={items} />
            </VariantSection>
        </ComponentSection>
    )
})
