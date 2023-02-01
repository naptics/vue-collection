import { createComponent, createProps } from '@/utils/vue-collection/component'
import { computed } from 'vue'
import { ref, reactive, type PropType, watch } from 'vue'
import NInput, { nInputProps, type NInputExposed } from './NInput'
import {
    type ValidationRule,
    type ValidationResult,
    validate,
    type InputValue,
    required,
} from '@/utils/vue-collection/validation'
import type { ValidatedForm } from './ValidatedForm'

export const validationProps = createProps({
    /**
     * If set to `true` this input is always valid when its value is empty.
     * If set to `false` the input receives the {@link required} rule. Default is `false`.
     */
    optional: Boolean,
    /**
     * The rules which this input is checked with.
     * The rules are checked sequentially and the error of the first failed rule is displayed.
     * If `optional` is set to false, the rule {@link required} will be checked first.
     */
    rules: {
        type: [Function, Array] as PropType<ValidationRule[] | ValidationRule>,
        default: () => [],
    },
    /**
     * The form, which this input will be added to.
     * On initialization, this input will call {@link ValidatedForm.addInput} passing itself to the form.
     */
    form: Object as PropType<ValidatedForm>,
    /**
     * Overrides the internal error state. If set to true, it will always display an error.
     */
    error: Boolean,
    /**
     * Overrides the internal error message. If set, this message is always displayed.
     */
    errorMessage: String,
    /**
     * If set to `true` the error message is not shown.
     * However, the input is still marked red if it is in an error state.
     */
    hideErrorMessage: Boolean,
    /**
     * Disables the validation on blur. Should only be used in special occasions.
     */
    disableBlurValidation: Boolean,
})

export const nValInputProps = createProps({
    ...nInputProps,
    ...validationProps,
    /**
     * A slot to replace the input.
     */
    input: Function as PropType<(props: InputSlotProps) => JSX.Element>,
})

export type InputSlotProps = {
    onBlur(): void
    onUpdateValue(newValue: string): void
    error: boolean
}

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
} & NInputExposed

/**
 * The `NValInput` is a `NInput` with custom validation.
 */
export default createComponent('NValInput', nValInputProps, (props, context) => {
    const rules = computed(() => {
        const otherRules = Array.isArray(props.rules) ? props.rules : [props.rules]
        return props.optional ? otherRules : [required, ...otherRules]
    })

    const validationResult = ref<ValidationResult>()
    const validateRules = (input: InputValue) => {
        const result = validate(input, rules.value)
        validationResult.value = result
        return result
    }

    const showError = computed(() => props.error || (validationResult.value != null && !validationResult.value.isValid))
    const showErrorMessage = computed(() => !props.hideErrorMessage && showError.value)
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
        if (!props.disableBlurValidation) validateRules(props.value)
        props.onBlur?.()
    }

    const onUpdateValue = (newValue: string) => {
        validateIfError(newValue)
        props.onUpdateValue?.(newValue)
    }

    const inputSlotProps: InputSlotProps = reactive({
        onBlur,
        onUpdateValue,
        error: showError,
    })

    const inputRef = ref<NInputExposed>()
    const expose: NValInputExposed = {
        validate: () => validateRules(props.value),
        reset: () => (validationResult.value = undefined),
        focus: () => inputRef.value?.focus(),
    }
    context.expose(expose)
    props.form?.addInput(expose)

    return () => (
        <div>
            {props.input?.(inputSlotProps) || <NInput ref={inputRef} {...{ ...props, ...inputSlotProps }} />}
            {showErrorMessage.value && <p class="text-red-500 text-xs mt-1">{errorMessage.value}</p>}
        </div>
    )
})
