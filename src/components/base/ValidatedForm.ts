import type { ValidationResult } from '@/utils/validation'
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
     * Adds the input to the list of this form.
     */
    addInput(input: NValInputExposed): void
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
    inputs: NValInputExposed[] = []

    addInput(input: NValInputExposed): void {
        this.inputs.push(input)
    }

    validate(): ValidationResult {
        const results = this.inputs.map(input => input.validate())
        // return first invalid result
        for (const result of results) if (result && !result.isValid) return result
        // else return valid result
        return { isValid: true }
    }

    reset(): void {
        this.inputs.forEach(input => input.reset())
    }
}
