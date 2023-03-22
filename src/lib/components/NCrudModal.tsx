import { trsl } from '@/i18n'
import { createComponent, createProps } from '@/lib/utils/component'
import { ref, type PropType } from 'vue'
import NButton from './NButton'
import type { DialogVariant, NDialogExposed } from './NDialog'
import NDialog from './NDialog'
import NFormModal, { nFormModalProps } from './NFormModal'

export const nCrudModalProps = createProps({
    ...nFormModalProps,
    /**
     * The text of the remove-button.
     */
    removeText: {
        type: String,
        default: trsl('vue-collection.action.remove'),
    },
    /**
     * The color of the remove-button.
     */
    removeColor: {
        type: String,
        default: 'red',
    },
    /**
     * The title of the dialog which appears when clicking on the remove-button.
     */
    removeDialogTitle: String,
    /**
     * The text of the dialog which appears when clicking on the remove-button.
     */
    removeDialogText: String,
    /**
     * The variant of the dialog which appears when clicking on the remove-button. Default is `remove`.
     */
    removeDialogVariant: {
        type: String as PropType<DialogVariant>,
        default: 'remove',
    },
    /**
     * The text of the dialog's ok-button. Is already set by the `removeDialogVariant` but can be overridden.
     */
    removeDialogOkText: String,
    /**
     * If set to `true` the modal will close itself when `onRemove` is called.
     */
    closeOnRemove: {
        type: Boolean,
        default: true,
    },
    /**
     * This is called, when the remove-button has been clicked and the dialog has been accepted.
     */
    onRemove: Function as PropType<() => void>,
})

/**
 * The `NCrudModal` is a {@link NFormModal} which has some convenience features for a CRUD-scenario.
 * It has an integrated remove-button with a user-dialog to remove the editing element.
 * When the dialog is accepted `onRemove` is called.
 */
export default createComponent('NCrudModal', nCrudModalProps, (props, { slots }) => {
    const removeDialog = ref<NDialogExposed>()

    const remove = () => {
        removeDialog.value?.show().then(result => {
            if (result) {
                props.onRemove?.()
                if (props.closeOnRemove) props.onUpdateValue?.(false)
            }
        })
    }

    return () => (
        <NFormModal
            {...props}
            footer={
                props.footer ||
                (({ ok, cancel }) => (
                    <div class="flex justify-between">
                        <div>
                            <NButton color={props.removeColor} onClick={remove}>
                                {props.removeText}
                            </NButton>
                        </div>
                        <div>
                            <NButton color={props.cancelColor} onClick={cancel}>
                                {props.cancelText}
                            </NButton>
                            <NButton color={props.okColor} onClick={ok} class="ml-2" disabled={props.okDisabled}>
                                {props.okText}
                            </NButton>
                        </div>
                    </div>
                ))
            }
        >
            {slots.default?.()}
            <NDialog
                ref={removeDialog}
                variant={props.removeDialogVariant}
                title={props.removeDialogTitle}
                text={props.removeDialogText}
                okText={props.removeDialogOkText}
            />
        </NFormModal>
    )
})
