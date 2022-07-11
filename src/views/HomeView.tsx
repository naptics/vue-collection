import NBadge from '@/components/base/NBadge'
import NButton from '@/components/base/NButton'
import NCheckbox from '@/components/base/NCheckbox'
import NCheckboxLabel from '@/components/base/NCheckboxLabel'
import NForm from '@/components/base/NForm'
import NIconButton from '@/components/base/NIconButton'
import NInput from '@/components/base/NInput'
import NModal from '@/components/base/NModal'
import NValInput from '@/components/base/NValInput'
import { createValidatedForm } from '@/components/base/ValidatedForm'
import { email, matches, regex } from '@/utils/validation'
import { createView, refAsVModel } from '@/utils/vue'
import { ExternalLinkIcon, PencilIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'

const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+\-=!*()@%&?]).{8,}$/

export default createView('HomeView', () => {
    const checkboxValue = ref(false)
    const inputValue = ref('')
    const pwValue = ref('')
    const pw2Value = ref('')

    const showModal1 = ref(false)
    const showModal2 = ref(false)

    const form = createValidatedForm()

    const onClick = () => {
        form.validate()
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

            <NForm validation={form} onSubmit={() => console.log('submit')}>
                <NValInput
                    ref={form.addInput()}
                    name="Email"
                    value={inputValue.value}
                    onUpdateValue={newValue => (inputValue.value = newValue)}
                    rules={[email]}
                />
                <NValInput
                    ref={form.addInput()}
                    name="Passwort"
                    type="password"
                    value={pwValue.value}
                    onUpdateValue={newValue => (pwValue.value = newValue)}
                    rules={[regex(PASSWORD_FORMAT)]}
                    optional={true}
                />
                <NValInput
                    ref={form.addInput()}
                    name="Passwort wiederholen"
                    type="password"
                    value={pw2Value.value}
                    onUpdateValue={newValue => (pw2Value.value = newValue)}
                    rules={[matches(() => pwValue.value)]}
                    optional={!pwValue.value}
                />
                <NButton type="submit"> submit now </NButton>
            </NForm>
            <div class="flex space-x-2 items-center">
                <NBadge>Hallo</NBadge>
                <NBadge color="secondary" text="seco" />
                <NBadge color="green" shade={700} textShade={100}>
                    Velo
                </NBadge>
                <NBadge color="red" shade={700} textShade={100}>
                    Auto
                </NBadge>
                <NBadge allCaps={false} textSize="text-xl">
                    Normal
                </NBadge>
            </div>
            <div>
                <NModal {...refAsVModel(showModal1)} title="Hello Modal">
                    Here some basic content
                </NModal>

                <NModal
                    {...refAsVModel(showModal2)}
                    header={() => <div>hello</div>}
                    footer={({ ok, cancel }) => (
                        <div class="flex space-x-2">
                            <NButton onClick={ok}>Custom Ok</NButton>
                            <NButton color="secondary" onClick={cancel}>
                                Custom Cancel
                            </NButton>
                        </div>
                    )}
                >
                    Content here
                </NModal>
                <NButton onClick={() => (showModal1.value = true)}> Open Modal </NButton>
                <NButton onClick={() => (showModal2.value = true)}> Open Modal 2 </NButton>
            </div>
            <div class="flex space-x-2 items-center">
                <NIconButton
                    icon={PencilIcon}
                    disabled={showModal1.value}
                    onClick={() => console.log('Hello IconButton')}
                />
                <NIconButton icon={ExternalLinkIcon} link="/" />
            </div>
        </div>
    )
})
