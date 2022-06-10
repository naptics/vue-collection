import NButton from '@/components/base/NButton'
import NCheckbox from '@/components/base/NCheckbox'
import { createView } from '@/utils/vue'

export default createView('HomeView', () => {
    return () => (
        <div class="p-8 space-x-8">
            <NButton> Click me! </NButton>
            <NCheckbox />
        </div>
    )
})
