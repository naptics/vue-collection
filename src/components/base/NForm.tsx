import { createComponent, createProps } from '@/utils/vue'
import type { PropType } from 'vue'
import type { ValidatedForm } from './ValidatedForm'

export const nFormProps = createProps({
    onSubmit: Function as PropType<() => void>,
    validation: Object as PropType<ValidatedForm>,
})

export default createComponent('NForm', nFormProps, (props, context) => {
    const onSubmit = (event: Event) => {
        event.preventDefault()
        if (!props.validation || props.validation.validate().isValid) props.onSubmit?.()
    }

    return () => <form onSubmit={onSubmit}>{context.slots.default?.()}</form>
})
