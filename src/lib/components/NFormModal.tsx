import { createComponentWithSlots } from '../utils/component'
import type { TWMaxWidth } from '../utils/tailwind'
import { type PropType, computed } from 'vue'
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
const Component = createComponentWithSlots(
    'NFormModal',
    nFormModalProps,
    ['modal', 'header', 'footer'],
    (props, { slots }) => {
        const onOk = () => {
            if (!props.form || props.form.validate().isValid) {
                props.onOk?.()
                if (props.closeOnOk) props.onUpdateValue?.(false)
            }
        }

        const childProps = computed(() => ({
            ...props,
            onOk,
            closeOnOk: false,
            onKeydown: (event: KeyboardEvent) => {
                if (event.metaKey && event.key === 'Enter') onOk()
            },
        }))

        return () => (
            <NModal {...childProps.value}>
                <NForm form={props.form}>{slots.default?.()}</NForm>
            </NModal>
        )
    }
)

export { Component as NFormModal, Component as default }
