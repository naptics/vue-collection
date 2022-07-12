import NBadge from '@/components/base/NBadge'
import NButton from '@/components/base/NButton'
import NCheckbox from '@/components/base/NCheckbox'
import NCheckboxLabel from '@/components/base/NCheckboxLabel'
import NCrudModal from '@/components/base/NCrudModal'
import NDialog, { type NDialogExposed } from '@/components/base/NDialog'
import NDropdown from '@/components/base/NDropdown'
import NForm from '@/components/base/NForm'
import NFormModal from '@/components/base/NFormModal'
import NIconButton from '@/components/base/NIconButton'
import NIconCircle from '@/components/base/NIconCircle'
import NInput from '@/components/base/NInput'
import NList from '@/components/base/NList'
import NLoader from '@/components/base/NLoader'
import NModal from '@/components/base/NModal'
import NSearchbar from '@/components/base/NSearchbar'
import NSelect from '@/components/base/NSelect'
import NValInput from '@/components/base/NValInput'
import { createValidatedForm } from '@/components/base/ValidatedForm'
import { email, matches, regex } from '@/utils/validation'
import { createView, refAsVModel } from '@/utils/vue'
import { RssIcon } from '@heroicons/vue/outline'
import { CogIcon, ExternalLinkIcon, EyeIcon, LockClosedIcon, PencilIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'

const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+\-=!*()@%&?]).{8,}$/

export default createView('HomeView', () => {
    const checkboxValue = ref(false)
    const inputValue = ref('')
    const pwValue = ref('')
    const pw2Value = ref('')

    const showModal1 = ref(false)
    const showModal2 = ref(false)
    const showModal3 = ref(false)
    const showModal4 = ref(false)

    const selectValue = ref<string>()

    const dialogRef = ref<NDialogExposed>()
    const showDialog = () => dialogRef.value?.show()

    const form1 = createValidatedForm()
    const form2 = createValidatedForm()

    const onClick = () => {
        form1.validate()
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

            <NForm form={form1} onSubmit={() => console.log('submit')}>
                <NValInput
                    ref={form1.addInput()}
                    name="Email"
                    value={inputValue.value}
                    onUpdateValue={newValue => (inputValue.value = newValue)}
                    rules={[email]}
                />
                <NValInput
                    ref={form1.addInput()}
                    name="Passwort"
                    type="password"
                    value={pwValue.value}
                    onUpdateValue={newValue => (pwValue.value = newValue)}
                    rules={[regex(PASSWORD_FORMAT)]}
                    optional={true}
                />
                <NValInput
                    ref={form1.addInput()}
                    name="Passwort wiederholen"
                    type="password"
                    value={pw2Value.value}
                    onUpdateValue={newValue => (pw2Value.value = newValue)}
                    rules={[matches(() => pwValue.value)]}
                    optional={!pwValue.value}
                />
                <NSelect
                    {...refAsVModel(selectValue)}
                    ref={form1.addInput()}
                    name="Status wählen"
                    options={[
                        { key: 'test', label: 'cool' },
                        { key: 'medium', label: 'medium' },
                    ]}
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

                <NFormModal {...refAsVModel(showModal3)} form={form2} title="Form Modal">
                    <NValInput
                        ref={form2.addInput()}
                        name="Email"
                        value={inputValue.value}
                        onUpdateValue={newValue => (inputValue.value = newValue)}
                        rules={[email]}
                    />
                    <NValInput
                        ref={form2.addInput()}
                        name="Passwort"
                        type="password"
                        value={pwValue.value}
                        onUpdateValue={newValue => (pwValue.value = newValue)}
                        rules={[regex(PASSWORD_FORMAT)]}
                        optional={true}
                    />
                    <NValInput
                        ref={form2.addInput()}
                        name="Passwort wiederholen"
                        type="password"
                        value={pw2Value.value}
                        onUpdateValue={newValue => (pw2Value.value = newValue)}
                        rules={[matches(() => pwValue.value)]}
                        optional={!pwValue.value}
                    />
                </NFormModal>

                <NCrudModal
                    {...refAsVModel(showModal4)}
                    title="Crud Modal"
                    removeDialogTitle="Template löschen"
                    removeDialogText="Möchten Sie das Template unwiderruflich löschen? Dies kann nicht rückgängig gemacht werden."
                >
                    Hello Crud Modal
                </NCrudModal>

                <NButton onClick={() => (showModal1.value = true)}> Open Modal </NButton>
                <NButton onClick={() => (showModal2.value = true)}> Open Modal 2 </NButton>
                <NButton onClick={() => (showModal3.value = true)}> Open Form Modal </NButton>
                <NButton onClick={() => (showModal4.value = true)}> Open Crud Modal </NButton>
            </div>

            <div class="flex space-x-2 items-center">
                <NIconButton
                    icon={PencilIcon}
                    disabled={showModal1.value}
                    onClick={() => console.log('Hello IconButton')}
                />
                <NIconButton icon={ExternalLinkIcon} link="/" />

                <NIconCircle icon={PencilIcon} circleSize={12} />
                <NIconCircle color="secondary" icon={EyeIcon} iconSize={4} />
                <NIconCircle color="default" icon={LockClosedIcon} iconSize={4} circleSize={12} />
            </div>

            <div>
                <NButton onClick={showDialog}> Show Dialog</NButton>
                <NDialog
                    ref={dialogRef}
                    variant="remove"
                    title="Benutzer löschen"
                    text="Wollen Sie den Benutzer wirklich unwiderruflich löschen? Dies kann nicht rückgängig gemacht werden. "
                />
            </div>

            <div>
                <NDropdown
                    text="Choose Option"
                    items={[
                        [
                            { label: 'Hello', action: () => console.log('hello'), icon: CogIcon },
                            { label: 'Link', route: '/', icon: ExternalLinkIcon },
                            { label: 'Disabled', disabled: true, icon: RssIcon },
                        ],
                        [{ label: 'Other section' }],
                    ]}
                />
            </div>

            <div>
                <NList
                    items={[
                        { title: 'Name', text: 'Gerber' },
                        { title: 'Vorname', text: 'Frank' },
                        { title: 'Adresse', text: 'Schneestrasse 12' },
                        { title: 'Ort', text: '8120 Wald ZH' },
                    ]}
                />
            </div>
            <div>
                <NLoader />
            </div>
            <div>
                <NSearchbar placeholder="Such jetzt!" {...refAsVModel(pw2Value)} />
            </div>
        </div>
    )
})
