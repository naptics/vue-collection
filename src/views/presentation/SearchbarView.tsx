import NSearchbar from '@/components/base/NSearchbar'
import NSearchbarList from '@/components/base/NSearchbarList'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue-collection/component'
import { refAsVModel } from '@/utils/vue-collection/vModel'
import { UserIcon } from '@heroicons/vue/24/solid'
import { computed, ref } from 'vue'

export default createView('SearchbarView', () => {
    const refs = Array.from({ length: 10 }, () => ref(''))

    const suggestions = [
        { id: '1', name: 'Heidi Klum' },
        { id: '2', name: 'Frida Kahlo' },
        { id: '3', name: 'Berta Meier' },
        { id: '4', name: 'Mike Müller' },
        { id: '5', name: 'Hans Peter' },
        { id: '6', name: 'Franz Weber' },
        { id: '7', name: 'Franziska Weberin' },
        { id: '8', name: 'Angela Merkel' },
    ]

    const filteredSuggestions = (n: number) => {
        return computed(() =>
            suggestions
                .filter(sugg => sugg.name.toLowerCase().includes(refs[n].value.toLowerCase()))
                .map(sugg => ({ id: sugg.id, label: sugg.name }))
        )
    }

    function vModel(n: number) {
        return refAsVModel(refs[n])
    }

    return () => (
        <ComponentSection
            title="Searchbars"
            subtitle="Searchbars are styled inputs which can optionally provide a list of suggestions."
            id="searchbars"
        >
            <VariantSection title="Simple Searchbars">
                <ComponentGrid cols={2}>
                    <NSearchbar placeholder="Big Searchbar" {...vModel(0)} />
                    <NSearchbar small placeholder="Small Searchbar" {...vModel(1)} />
                </ComponentGrid>
            </VariantSection>

            <VariantSection title="With Suggestion List" subtitle="">
                <ComponentGrid cols={2}>
                    <NSearchbarList {...vModel(2)} items={filteredSuggestions(2).value} placeholder="Basic List" />
                    <NSearchbarList
                        {...vModel(3)}
                        items={filteredSuggestions(3).value}
                        placeholder="Loading Indicator"
                        loading
                    />
                    <NSearchbarList
                        {...vModel(4)}
                        items={filteredSuggestions(4).value}
                        hideList={refs[4].value.length < 3}
                        placeholder="Min. 3 Characters"
                    />
                    <NSearchbarList
                        {...vModel(5)}
                        items={filteredSuggestions(5).value}
                        placeholder="Customized Items"
                        listItem={item => (
                            <div class="flex space-x-2 items-center justify-start">
                                <UserIcon class="h-5 w-5 text-default-600" />
                                <span class="text-lg text-default-700 font-medium">{item.item.label}</span>
                            </div>
                        )}
                    />
                </ComponentGrid>
            </VariantSection>
        </ComponentSection>
    )
})
