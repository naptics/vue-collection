import { Id, type Identifiable } from '../utils/identifiable'
import { uniqueId } from '../utils/utils'
import type { ValidationResult } from '../utils/validation'
import type { NValInputExposed } from './NValInput'

/**
 * A ValidatedForm groups different inputs together and provides functions, which operate on all inputs at the same time.
 * With a form multiple inputs can be validated together by calling the validate function.
 * @example
 * const form = createValidatedForm()
 * <NValInput ... form={form} />
 * <NValInput ... form={form} />
 * const onClick = () => form.validate()
 */
export type ValidatedForm = {
    /**
     * Adds the input to the list of this form and returns the assigned `id`.
     * If this form is passed to a `<NValInput />` via the props, will add itself to this form.
     * @returns the newly assigned `id` of the added input.
     * @example
     * <NValInput ... form={form} />
     */
    addInput(input: NValInputExposed): string
    /**
     * Removes the input with the given `id` from this form.
     */
    removeInput(id: string): void
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
    inputs: (NValInputExposed & Identifiable)[] = []

    addInput(input: NValInputExposed): string {
        const id = `input-${uniqueId()}`
        this.inputs.push({ id, ...input })
        return id
    }

    removeInput(id: string): void {
        Id.remove(this.inputs, id)
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
