import { createComponent, createProps } from '@/utils/vue'
import { computed, toRefs } from '@vue/reactivity'
import { ref, reactive, type PropType, watch } from 'vue'
import NInput, { nInputProps } from './NInput'
import { type ValidationRule, type ValidationResult, validate, type InputValue, required } from '@/utils/validation'

export const nValInputProps = createProps({
    ...nInputProps,
    optional: Boolean,
    rules: {
        type: Array as PropType<ValidationRule[]>,
        default: () => [],
    },
    /**
     * Overrides the internal error state. If set to true, it will always display an error.
     */
    error: Boolean,
    /**
     * Overrides the internal error message. If set, this message is always displayed.
     */
    errorMessage: Boolean,
})

/**
 * The exposed functions of NValInput
 */
export type NValInputExposed = {
    /**
     * Validates the input and returns the validation result
     */
    validate: () => ValidationResult
    /**
     * Resets the validation state of the input.
     */
    reset: () => void
}

export default createComponent('NValInput', nValInputProps, (props, context) => {
    const rules = computed(() => (props.optional ? props.rules : [required, ...props.rules]))

    const validationResult = ref<ValidationResult>()
    const validateRules = (input: InputValue) => {
        const result = validate(input, rules.value)
        validationResult.value = result
        return result
    }

    const showError = computed(() => props.error || (validationResult.value != null && !validationResult.value.isValid))
    const errorMessage = computed(() => props.errorMessage || validationResult.value?.errorMessage)

    const validateIfError = (value = props.value) => {
        if (showError.value) validateRules(value)
    }

    watch(
        () => props.value,
        () => validateIfError()
    )

    watch(
        () => rules.value,
        () => validateIfError()
    )

    const onBlur = () => {
        validateRules(props.value)
        props.onBlur?.()
    }

    const onUpdateValue = (newValue: string) => {
        validateIfError(newValue)
        props.onUpdateValue?.(newValue)
    }

    const childProps = reactive({
        ...toRefs(props),
        onBlur,
        onUpdateValue,
        error: showError,
    })

    const expose: NValInputExposed = {
        validate: () => validateRules(props.value),
        reset: () => (validationResult.value = undefined),
    }
    context.expose(expose)

    return () => (
        <div>
            <NInput {...childProps} />
            {showError.value && <p class="text-red-500 text-xs mt-1">{errorMessage.value}</p>}
        </div>
    )
})
