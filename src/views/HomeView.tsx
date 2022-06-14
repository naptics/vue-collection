import NButton from '@/components/base/NButton'
import NCheckbox from '@/components/base/NCheckbox'
import NCheckboxLabel from '@/components/base/NCheckboxLabel'
import NInput from '@/components/base/NInput'
import { createView } from '@/utils/vue'
import { ref } from 'vue'

export default createView('HomeView', () => {
    const checkboxValue = ref(false)
    const inputValue = ref('')

    return () => (
        <div class="flex items-center p-8 space-x-8">
            <NButton> Click me! </NButton>
            <NCheckbox
                color="secondary"
                value={checkboxValue.value}
                onUpdateValue={newValue => (checkboxValue.value = newValue)}
            />
            <NCheckboxLabel
                value={checkboxValue.value}
                title="Beste Option"
                description="Mit dieser Option sind Sie immer zufrieden."
            />
            <NInput name="Name" value={inputValue.value} onUpdateValue={newValue => (inputValue.value = newValue)} />
            <NInput
                name="Nachname"
                value={inputValue.value}
                error
                onUpdateValue={newValue => (inputValue.value = newValue)}
            />
        </div>
    )
})
