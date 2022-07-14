import NPagination from '@/components/base/NPagination'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView, refAsVModel } from '@/utils/vue'
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
                    <NPagination {...refAsVModel(pageRef)} total={25} />
                    <NPagination small {...refAsVModel(pageRef)} total={25} />
                </div>
            </VariantSection>
        </ComponentSection>
    )
})
