import { EMAIL_FORMAT } from './format'

export type ValidationResultValid = {
    isValid: true
    errorMessage?: undefined
}

export type ValidationResultInvalid = {
    isValid: false
    errorMessage: string
}

export type InputValue = string | null | undefined
export type ValidationResult = ValidationResultValid | ValidationResultInvalid
export type ValidationRule = (input: InputValue) => ValidationResult

function validResult(): ValidationResultValid {
    return { isValid: true }
}

function invalidResult(message: string): ValidationResultInvalid {
    return { isValid: false, errorMessage: message }
}

/**
 * Validates a given input with the specified rules.
 * The rules are evaluated in the order they're in the array.
 * The {@link ValidationResult} will either contain the errorMessage of the failed rule
 * or a valid result if all rules passed.
 * @param input the input to validate.
 * @param rules the rules which should be vaildated, in the order of priority.
 * @returns an object containing the result of the validation.
 */
export function validate(input: InputValue, rules: ValidationRule[]): ValidationResult {
    for (const rule of rules) {
        const validationResult = rule(input)
        if (!validationResult.isValid) return validationResult
    }
    return validResult()
}

/**
 * This rule expects the input-value to be truthy.
 */
export const required: ValidationRule = input => {
    const trimmed = input?.trim()
    if (trimmed) return validResult()
    else return invalidResult('Dieses Feld ist ein Pflichtfeld.')
}

/**
 * This rule expects the input-value to be a valid email adress.
 */
export const email: ValidationRule = input => {
    if (!input || EMAIL_FORMAT.test(input)) return validResult()
    else return invalidResult('Dieses Feld muss eine gültige Email-Adresse sein.')
}

/**
 * This rule expects the input-value to match another (input-) value.
 * @param other a function which returns the other value.
 */
export function matches(other: () => string): ValidationRule {
    return input => {
        if (!input || input === other()) return validResult()
        else return invalidResult('Die beiden Felder stimmen nicht überein.')
    }
}

/**
 * This rule expects the input-value to match the regex pattern
 * @param pattern the pattern the input should match.
 */
export function regex(pattern: RegExp): ValidationRule {
    return input => {
        if (!input || pattern.test(input)) return validResult()
        else return invalidResult('Dieses Feld stimmt nicht mit dem geforderten Format überein.')
    }
}
