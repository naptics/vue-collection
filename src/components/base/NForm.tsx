import { createComponent, createProps } from '@/utils/component'
import type { PropType } from 'vue'
import type { ValidatedForm } from './ValidatedForm'

export const nFormProps = createProps({
    /**
     * The {@link ValidatedForm} which will be used to validate the inputs.
     * All inputs in this forms hierarchy should be added to the {@link ValidatedForm}.
     */
    form: Object as PropType<ValidatedForm>,
    /**
     * This is called, when a button of type `submit` in the hierarchy of this view is clicked
     * and when the validation of the `form` was successful.
     */
    onSubmit: Function as PropType<() => void>,
})

/**
 * The `NForm` should be used to wrap multiple inputs.
 * If it contains a button of type `submit` in it's hierarchy,
 * it catches the submit event and passes it to the {@link ValidatedForm} in its `form` prop.
 */
export default createComponent('NForm', nFormProps, (props, context) => {
    const onSubmit = (event: Event) => {
        event.preventDefault()
        if (!props.form || props.form.validate().isValid) props.onSubmit?.()
    }

    return () => <form onSubmit={onSubmit}>{context.slots.default?.()}</form>
})
