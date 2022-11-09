import { trsl } from '@/i18n'

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

/**
 * A `ValidationRule` checks an input for a criteria and returns either
 * a {@link ValidationResultValid} or a {@link ValidationResultInvalid}.
 * A falsy input-value should always return a valid result to not interfere
 * with the {@link required} rule.
 */
export type ValidationRule = (input: InputValue) => ValidationResult

export function validResult(): ValidationResultValid {
    return { isValid: true }
}

export function invalidResult(ruleKey: string): ValidationResultInvalid {
    return { isValid: false, errorMessage: trsl(`vue-collection.validation.rules.${ruleKey}`) }
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

// Validation formats

/**
 * This rule expects the trimmed input-value to be truthy.
 */
export const required: ValidationRule = input => {
    const trimmed = input?.trim()
    if (trimmed) return validResult()
    else return invalidResult('required')
}

export const VALIDATION_FORMAT_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

/**
 * This rule expects the input-value to be a valid email adress matching {@link VALIDATION_FORMAT_EMAIL}.
 */
export const email: ValidationRule = input => {
    if (!input || VALIDATION_FORMAT_EMAIL.test(input)) return validResult()
    else return invalidResult('email')
}

export const VALIDATION_FORMAT_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+\-=!*()@%&?]).{8,}$/

/**
 * This rule expects the input-value to be a password matching {@link VALIDATION_FORMAT_PASSWORD}.
 */
export const password: ValidationRule = input => {
    if (!input || VALIDATION_FORMAT_PASSWORD.test(input)) return validResult()
    else if (input.length < 8) return invalidResult('password.to-short')
    else if (!/[a-z]+/.test(input)) return invalidResult('password.no-lowercase')
    else if (!/[A-Z]+/.test(input)) return invalidResult('password.no-uppercase')
    else if (!/\d+/.test(input)) return invalidResult('password.no-digits')
    else if (!/[#$^+\-=!*()@%&?]+/.test(input)) return invalidResult('password.no-special-chars')
    else return invalidResult('password.unknown')
}

/**
 * This rule expects the input-value to match another (input-) value.
 * In difference to most other rules, this rule does not always return a valid result,
 * when the input is falsy. The input is always required to match the other value.
 * @param other the other value to match
 */
export function matches(other: string | null | undefined): ValidationRule {
    return input => {
        if (input === other) return validResult()
        else return invalidResult('matches')
    }
}

/**
 * This rule expects the input-value to match one option in an array.
 * @param options the options which the input can match
 */
export function option(options: string[]): ValidationRule {
    return input => {
        if (!input || options.includes(input || '')) return validResult()
        else return invalidResult('option')
    }
}

/**
 * This rule expects the input-value to match the regex pattern
 * @param pattern the pattern the input should match.
 */
export function regex(pattern: RegExp): ValidationRule {
    return input => {
        if (!input || pattern.test(input || '')) return validResult()
        else return invalidResult('regex')
    }
}

/**
 * This rule can be used if the validation logic happens somwhere else.
 * When `isValid = true` is passed, the function will return a valid result,
 * otherwise it will return the invalid result with the passed `errorKey`.
 * Like always, a falsy input is always valid to not interefere with the {@link required} rule.
 */
export function external(isValid: boolean, errorKey: string): ValidationRule {
    return input => (!input || isValid ? validResult() : invalidResult(errorKey))
}
