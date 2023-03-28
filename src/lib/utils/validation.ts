import { trsl } from '../i18n'

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

export function invalidResult(ruleTranslationKey: string, params?: Record<string, unknown>): ValidationResultInvalid {
    return { isValid: false, errorMessage: trsl(ruleTranslationKey, params) }
}

const TRANSLATION_KEY_BASE = 'vue-collection.validation.rules'
function invalidResultInternal(key: string, params?: Record<string, unknown>): ValidationResultInvalid {
    return invalidResult(`${TRANSLATION_KEY_BASE}.${key}`, params)
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

/*
 * ---------- Validation Rules ----------
 */

/**
 * This rule expects the trimmed input-value to be truthy.
 */
export const required: ValidationRule = input => {
    const trimmed = input?.trim()
    if (trimmed) return validResult()
    else return invalidResultInternal('required')
}

/**
 * This rule expects the input to be an integer.
 */
export const integer: ValidationRule = input => {
    if (!input || Number.isInteger(+input)) return validResult()
    else return invalidResultInternal('integer')
}

/**
 * This rule expects the input to be in the specified length range. An empty input
 * will always be allowed by this rule to not interefere with the {@link required} rule.
 * @param min The minimum length of the string.
 * @param max The maximum length of the string.
 */
export function length(min: number | undefined, max: number | undefined): ValidationRule {
    return input => {
        if (!input) return validResult()

        if (min !== undefined && max !== undefined && !(min <= input.length && input.length <= max))
            return invalidResultInternal('length.min-max', { min, max })
        else if (min !== undefined && !(min <= input.length)) return invalidResultInternal('length.min', { min })
        else if (max !== undefined && !(input.length <= max)) return invalidResultInternal('length.max', { max })

        return validResult()
    }
}

/**
 * This rule expects the input to be a number in the specified range.
 * @param min the lower bound, if `undefined` there is no lower bound.
 * @param max the upper bound, if `undefined` there is no upper bound.
 */
export function numberRange(min: number | undefined, max: number | undefined): ValidationRule {
    return input => {
        if (!input) return validResult()

        const parsed = Number.parseFloat(input)
        if (Number.isNaN(parsed)) return invalidResultInternal('number-range.nan')

        if (min !== undefined && max !== undefined && !(min <= parsed && parsed <= max))
            return invalidResultInternal('number-range.min-max', { min, max })
        else if (min !== undefined && !(min <= parsed)) return invalidResultInternal('number-range.min', { min })
        else if (max !== undefined && !(parsed <= max)) return invalidResultInternal('number-range.max', { max })

        return validResult()
    }
}

export const VALIDATION_FORMAT_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

/**
 * This rule expects the input-value to be a valid email adress matching {@link VALIDATION_FORMAT_EMAIL}.
 */
export const email: ValidationRule = input => {
    if (!input || VALIDATION_FORMAT_EMAIL.test(input)) return validResult()
    else return invalidResultInternal('email')
}

export const VALIDATION_FORMAT_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+\-=!*()@%&?]).{8,}$/

/**
 * This rule expects the input-value to be a password matching {@link VALIDATION_FORMAT_PASSWORD}.
 */
export const password: ValidationRule = input => {
    if (!input || VALIDATION_FORMAT_PASSWORD.test(input)) return validResult()
    else if (input.length < 8) return invalidResultInternal('password.to-short')
    else if (!/[a-z]+/.test(input)) return invalidResultInternal('password.no-lowercase')
    else if (!/[A-Z]+/.test(input)) return invalidResultInternal('password.no-uppercase')
    else if (!/\d+/.test(input)) return invalidResultInternal('password.no-digits')
    else if (!/[#$^+\-=!*()@%&?]+/.test(input)) return invalidResultInternal('password.no-special-chars')
    else return invalidResultInternal('password.unknown')
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
        else return invalidResultInternal('matches')
    }
}

/**
 * This rule expects the input-value to match one option in an array.
 * @param options the options which the input can match
 */
export function option(options: string[]): ValidationRule {
    return input => {
        if (!input || options.includes(input || '')) return validResult()
        else return invalidResultInternal('option')
    }
}

/**
 * This rule expects the input-value to match the regex pattern
 * @param pattern the pattern the input should match.
 */
export function regex(pattern: RegExp): ValidationRule {
    return input => {
        if (!input || pattern.test(input || '')) return validResult()
        else return invalidResultInternal('regex')
    }
}

/**
 * This rule can be used if the validation logic happens somwhere else.
 * When `isValid = true` is passed, the function will return a valid result,
 * otherwise it will return the invalid result with the passed `errorKey`.
 * Like always, a falsy input is always valid to not interefere with the {@link required} rule.
 */
export function external(isValid: boolean, errorKey: string): ValidationRule {
    return input => (!input || isValid ? validResult() : invalidResultInternal(errorKey))
}
