import ComponentSection from '@/components/presentation/ComponentSection'
import { createView } from '@/utils/vue'

export default createView('LoaderView', () => {
    return () => <ComponentSection title="Loader"></ComponentSection>
})
