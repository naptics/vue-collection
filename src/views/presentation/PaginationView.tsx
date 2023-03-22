import NPagination from '@/lib/components/NPagination'
import ComponentSection from '@/demo/components/ComponentSection'
import VariantSection from '@/demo/components/VariantSection'
import { createView } from '@/lib/utils/component'
import { vModelForRef } from '@/lib/utils/vModel'
import { ref } from 'vue'

export default createView('PaginationView', () => {
    const pageRef = ref(1)

    return () => (
        <ComponentSection
            title="Pagination"
            subtitle="A pagination element to use for all paged contents."
            id="pagination"
        >
            <VariantSection title="Two sizes">
                <div class="flex flex-col justify-start items-start space-y-8">
                    <NPagination {...vModelForRef(pageRef)} total={25} />
                    <NPagination small {...vModelForRef(pageRef)} total={25} />
                </div>
            </VariantSection>
        </ComponentSection>
    )
})
