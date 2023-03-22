import { createView } from '@/lib/utils/component'
import { vModelForRef } from '@/lib/utils/vModel'
import { NoSymbolIcon, SunIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import NButton from '@/lib/components/NButton'
import NModal from '@/lib/components/NModal'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import NIconButton from '@/lib/components/NIconButton'
import NFormModal from '@/lib/components/NFormModal'
import { createValidatedForm } from '@/lib/components/ValidatedForm'
import NValInput from '@/lib/components/NValInput'
import { email } from '@/lib/utils/validation'
import NCrudModal from '@/lib/components/NCrudModal'
import NDialog, { type NDialogExposed } from '@/lib/components/NDialog'

export default createView('ModalView', () => {
    const refs = Array.from({ length: 6 }, () => ref(false))
    const dialogRefs = Array.from({ length: 5 }, () => ref<NDialogExposed>())
    const inputRefs = Array.from({ length: 4 }, () => ref(''))

    function openModal(n: number) {
        return () => (refs[n].value = true)
    }

    function openDialog(n: number) {
        return () => dialogRefs[n].value?.show().then(result => console.log(`Dialog result: ${result}`))
    }

    function vModel(n: number) {
        return vModelForRef(refs[n])
    }

    const form1 = createValidatedForm()
    const form2 = createValidatedForm()

    return () => (
        <>
            <ComponentSection
                title="Modals and Dialogs"
                subtitle="Useful components which come to the foreground to interact with the user."
                id="modals"
            >
                <VariantSection
                    title="Basic Modals"
                    subtitle="Basic Modals offer a lot of configuration possibilities. The title, texts and colors of buttons as well as all actions can be configured. If this is not enough, the header, footer or the whole modal can be replaced with a custom slot."
                >
                    <ComponentGrid cols={4}>
                        <NButton onClick={openModal(0)}> Basic Modal </NButton>
                        <NButton color="secondary" onClick={openModal(1)}>
                            Custom Header
                        </NButton>
                        <NButton color="blue" onClick={openModal(2)}>
                            Custom Footer
                        </NButton>
                        <NButton color="red" onClick={openModal(3)}>
                            Custom Modal
                        </NButton>
                    </ComponentGrid>
                </VariantSection>

                <VariantSection
                    title="Advanced Modals"
                    subtitle="The Advanced Modals provide utility to deal with forms. The Form Modal automatically checks the integrated form before closing. The Crud Modal adds an intergrated delete button with a dialog."
                >
                    <ComponentGrid cols={4}>
                        <NButton onClick={openModal(4)}> Form Modal </NButton>
                        <NButton color="secondary" onClick={openModal(5)}>
                            Crud Modal
                        </NButton>
                    </ComponentGrid>
                </VariantSection>

                <VariantSection
                    title="Dialogs"
                    subtitle="Dialogs can be used to prompt the user with a yes/no - decision or to interrupt them with important information."
                >
                    <ComponentGrid cols={4}>
                        <NButton color="red" onClick={openDialog(3)}>
                            Danger Dialog
                        </NButton>
                        <NButton color="red" onClick={openDialog(4)}>
                            Remove Dialog
                        </NButton>
                        <NButton color="yellow" onClick={openDialog(2)}>
                            Warning Dialog
                        </NButton>
                        <NButton color="blue" onClick={openDialog(1)}>
                            Info Dialog
                        </NButton>
                        <NButton color="green" onClick={openDialog(0)}>
                            Success Dialog
                        </NButton>
                    </ComponentGrid>
                </VariantSection>
            </ComponentSection>

            {/* Basic Modal */}
            <NModal {...vModel(0)} title="Basic Modal" cancelText="Bye Modal" okText="Ok Modal">
                This is a pretty basic modal. Nothing fancy.
            </NModal>

            {/* Custom Header */}
            <NModal {...vModel(1)} okColor="yellow" header={() => <SunIcon class="text-yellow-400 h-10 w-10" />}>
                This modal has a custom styled header.
            </NModal>

            {/* Custom Footer */}
            <NModal
                {...vModel(2)}
                title="Custom Footer"
                footer={({ cancel }) => (
                    <div class="flex justify-center">
                        <NIconButton icon={NoSymbolIcon} color="red" size={7} onClick={cancel} />
                    </div>
                )}
            >
                This modal has a custom footer
            </NModal>

            {/* Custom Modal */}
            <NModal
                {...vModel(3)}
                modal={({ cancel }) => (
                    <div class="bg-red-500 p-4 shadow-red-500 text-lg text-white shadow-2xl rounded-full flex justify-between items-center">
                        <span>Very ugly custom modal</span>
                        <NButton color="default" onClick={cancel}>
                            Close
                        </NButton>
                    </div>
                )}
            />

            {/* Form Modal */}
            <NFormModal {...vModel(4)} title="Form Modal" form={form1}>
                <NValInput {...vModelForRef(inputRefs[0])} form={form1} name="Name" />
                <NValInput {...vModelForRef(inputRefs[1])} form={form1} rules={email} name="Email" />
            </NFormModal>

            {/** Crud Modal */}
            <NCrudModal
                {...vModel(5)}
                title="Crud Modal"
                form={form2}
                removeDialogTitle="Remove this item"
                removeDialogText="Are you really really really sure?"
            >
                <NValInput {...vModelForRef(inputRefs[2])} form={form2} name="Name" />
                <NValInput {...vModelForRef(inputRefs[3])} form={form2} rules={email} name="Email" />
            </NCrudModal>

            {/* Dialogs */}
            <NDialog ref={dialogRefs[0]} variant="success" title="Success" text="This was a success." />
            <NDialog ref={dialogRefs[1]} variant="info" title="Info" text="This is an info." />
            <NDialog
                ref={dialogRefs[2]}
                variant="warning"
                title="Warning"
                text="Be careful, this is a warning with a pretty long text."
            />
            <NDialog
                ref={dialogRefs[3]}
                variant="danger"
                title="Dangerous Action"
                text="Would you really like to proceed."
            />
            <NDialog
                ref={dialogRefs[4]}
                variant="remove"
                title="Delete user"
                text="Are you sure you want to delete the user?"
            />
        </>
    )
})
