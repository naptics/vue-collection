import NButton from '@/components/base/NButton'
import NCheckbox from '@/components/base/NCheckbox'
import { createView } from '@/utils/vue'
import { ref } from 'vue'

export default createView('HomeView', () => {
    const checkboxValue = ref(false)

    return () => (
        <div class="p-8 space-x-8">
            <NButton> Click me! </NButton>
            <NCheckbox
                color="secondary"
                value={checkboxValue.value}
                onUpdateValue={newValue => (checkboxValue.value = newValue)}
            />
        </div>
    )
})
