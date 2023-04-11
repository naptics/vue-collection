import { createComponent } from '../utils/component'
import type { TWMaxWidth } from '../utils/tailwind'
import { reactive, toRefs, type PropType } from 'vue'
import NForm from './NForm'
import NModal, { nModalProps } from './NModal'
import type { ValidatedForm } from './ValidatedForm'

export const nFormModalProps = {
    ...nModalProps,
    /**
     * The maximum width of the modal. A regular tailwind class.
     */
    maxWidth: {
        type: String as PropType<TWMaxWidth>,
        default: 'max-w-lg',
    },
    /**
     * If set to `true` the modal closes when clicking on the background.
     * Default is `false` as the accidental reseting of the whole form is very annoying.
     */
    closeOnBackground: {
        type: Boolean,
        default: false,
    },
    /**
     * The {@link ValidatedForm} to validate the inputs.
     * All inputs should be added to the form.
     */
    form: Object as PropType<ValidatedForm>,
} as const

/**
 * The `NFormModal` is a {@link NModal} with an integrated form.
 * When submitting a `NFormModal` the form is first validated and
 * only if the validation is succesful the `onOk` event is called.
 */
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
