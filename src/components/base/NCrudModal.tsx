import { createComponent, createProps } from '@/utils/vue'
import { reactive, ref, toRefs, type PropType } from 'vue'
import NButton from './NButton'
import type { NDialogExposed } from './NDialog'
import NDialog from './NDialog'
import NFormModal, { nFormModalProps } from './NFormModal'

export const nCrudModalProps = createProps({
    ...nFormModalProps,
    removeText: {
        type: String,
        default: 'Löschen', //trsl('input.action.remove'),
    },
    removeColor: {
        type: String,
        default: 'red',
    },
    removeDialogTitle: String,
    removeDialogText: String,
    closeOnRemove: {
        type: Boolean,
        default: true,
    },
    onRemove: Function as PropType<() => void>,
})

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
                variant="remove"
                title={props.removeDialogTitle}
                text={props.removeDialogText}
            />
        </NFormModal>
    )
})
