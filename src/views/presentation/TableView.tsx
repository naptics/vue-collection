import NBadge from '@/components/base/NBadge'
import NIconButton from '@/components/base/NIconButton'
import NTable, { type TableHeading } from '@/components/base/NTable'
import NTableAction from '@/components/base/NTableAction'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/component'
import { PencilIcon } from '@heroicons/vue/solid'

export default createView('TableView', () => {
    const headings: TableHeading[] = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Username', emph: true },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'state', label: 'State' },
    ]

    const data = [
        { id: 1, username: 'herbert', email: 'herbert@naptics.ch', phone: '+41 76 810 29 21', state: 'unknown' },
        { id: 2, username: 'franziska', email: 'franzsika@naptics.ch', phone: '+41 76 810 28 22', state: 'registered' },
        { id: 3, username: 'frank', email: 'frank@naptics.ch', phone: '+41 76 810 27 23', state: 'registered' },
        { id: 4, username: 'prünhilde', email: 'pruenhilde@naptics.ch', phone: '+41 76 810 26 24', state: 'banned' },
        { id: 5, username: 'gertrud', email: 'gertrud@naptics.ch', phone: '+41 76 810 25 25', state: 'registered' },
    ]

    return () => (
        <ComponentSection
            title="Tables"
            subtitle="Tables are perfect to display a lot of data in an orderly way."
            id="tables"
        >
            <VariantSection
                title="Basic Table"
                subtitle="If nothing needs to be customized, the data can be displayed directly as text."
            >
                <NTable headings={headings} items={data} />
            </VariantSection>

            <VariantSection title="Customization" subtitle="Individual rows can be customized to use other elements.">
                <NTable
                    headings={headings}
                    items={data.map(item => ({
                        ...item,
                        state: () => (
                            <NBadge
                                textSize="text-xs"
                                color={
                                    item.state == 'registered' ? 'green' : item.state == 'banned' ? 'red' : 'default'
                                }
                            >
                                {item.state}
                            </NBadge>
                        ),
                    }))}
                />
            </VariantSection>

            <VariantSection
                title="Actions"
                subtitle="Table Actions can be added to either trigger an action or navigate to a route."
            >
                <NTable
                    headings={[...headings.slice(0, 4), { key: 'action', cellClass: 'flex-row-reverse' }]}
                    items={data.map(item => ({
                        ...item,
                        username: () => <NTableAction route={`/`} text={item.username} />,
                        action: () => (
                            <NIconButton icon={PencilIcon} onClick={() => alert(`You will edit ${item.username}.`)} />
                        ),
                    }))}
                />
            </VariantSection>
        </ComponentSection>
    )
})
