import NButton from '@/components/base/NButton'
import NCheckbox from '@/components/base/NCheckbox'
import NCheckboxLabel from '@/components/base/NCheckboxLabel'
import NInput from '@/components/base/NInput'
import NValInput, { type NValInputExposed } from '@/components/base/NValInput'
import { email } from '@/utils/validation'
import { createView } from '@/utils/vue'
import { ref } from 'vue'

export default createView('HomeView', () => {
    const checkboxValue = ref(false)
    const inputValue = ref('')

    const valInput = ref<NValInputExposed>()

    const onClick = () => {
        valInput?.value?.validate()
    }

    return () => (
        <div class="grid grid-cols-3 gap-8 p-8">
            <NButton onClick={onClick}> Click me! </NButton>
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
            <NValInput
                ref={valInput}
                name="Email"
                value={inputValue.value}
                rules={[email]}
                onUpdateValue={newValue => (inputValue.value = newValue)}
            />
        </div>
    )
})
