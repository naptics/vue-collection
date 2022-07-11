import type { ValidationResult } from '@/utils/validation'
import { ref, type Ref } from 'vue'
import type { NValInputExposed } from './NValInput'

/**
 * A ValidatedForm groups different inputs together and provides functions, which operate on all inputs at the same time.
 * With a form multiple inputs can be validated together by calling the validate function.
 * @example
 * const form = createValidatedForm()
 * <NValInput ... ref={form.addInput()} />
 * <NValInput ... ref={form.addInput()} />
 * const onClick = () => form.validate()
 */
export type ValidatedForm = {
    /**
     * Adds the input to the list of this form. The returned ref should be used as the inputs ref.
     */
    addInput(): Ref<NValInputExposed | undefined>
    /**
     * Validates all inputs of the form. If inputs are invalid they will show it visually.
     * The first invalid validation result is returned.
     */
    validate(): ValidationResult
    /**
     * Resets the validation state of all inputs.
     */
    reset(): void
}

/**
 * Creates a new ValidatedForm.
 * @returns the instance of the new form.
 */
export function createValidatedForm(): ValidatedForm {
    return new ValidatedFormImpl()
}

class ValidatedFormImpl implements ValidatedForm {
    inputs: Ref<NValInputExposed | undefined>[] = []

    addInput(): Ref<NValInputExposed | undefined> {
        const newLit = ref<NValInputExposed>()
        this.inputs.push(newLit)
        return newLit
    }

    validate(): ValidationResult {
        const results = this.inputs.map(input => input.value?.validate())
        // return first invalid result
        for (const result of results) if (result && !result.isValid) return result
        // else return valid result
        return { isValid: true }
    }

    reset(): void {
        this.inputs.forEach(input => input.value?.reset())
    }
}
