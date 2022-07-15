import { createComponent, createProps } from '@/utils/component'
import { reactive, toRefs, type PropType } from 'vue'
import NForm from './NForm'
import NModal, { nModalProps } from './NModal'
import type { ValidatedForm } from './ValidatedForm'

export const nFormModalProps = createProps({
    ...nModalProps,
    maxWidth: {
        type: String as PropType<'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl'>,
        default: 'max-w-lg',
    },
    closeOnBackground: {
        type: Boolean,
        default: false,
    },
    form: Object as PropType<ValidatedForm>,
})

export default createComponent('NFormModal', nFormModalProps, (props, { slots }) => {
    const childProps = reactive({
        ...toRefs(props),
        onOk: () => {
            if (!props.form || props.form.validate().isValid) {
                props.onOk?.()
                if (props.closeOnOk) props.onUpdateValue?.(false)
            }
        },
        closeOnOk: false,
    })

    return () => (
        <NModal {...childProps}>
            <NForm form={props.form}>{slots.default?.()}</NForm>
        </NModal>
    )
})
