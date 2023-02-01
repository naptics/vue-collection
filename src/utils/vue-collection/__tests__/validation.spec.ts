import { trsl } from '@/i18n'
import { describe, expect, test } from 'vitest'
import { email, external, matches, option, password, regex, required } from '../validation'

const expectValid = (test: unknown) => expect(test).toMatchObject({ isValid: true })
const expectInvalid = (test: unknown, errKey: string) =>
    expect(test).toMatchObject({ isValid: false, errorMessage: trsl(`vue-collection.validation.rules.${errKey}`) })

describe('validation', () => {
    test('required', () => {
        expectValid(required('_'))
        expectValid(required(' i '))
        expectValid(required('hellooh'))
        expectValid(required('`'))

        expectInvalid(required(undefined), 'required')
        expectInvalid(required(null), 'required')
        expectInvalid(required(''), 'required')
        expectInvalid(required(' '), 'required')
    })

    test('email', () => {
        expectValid(email(''))
        expectValid(email('_@_.ch'))
        expectValid(email('dfadfasd.dfad.fdak@_.ch'))
        expectValid(email('dfadfasd.dfad.fdak@dfdaf.chdl.ch'))
        expectValid(email('deslek-djsl@dfdaf-cas.ch'))

        expectInvalid(email('a'), 'email')
        expectInvalid(email('a@'), 'email')
        expectInvalid(email('a@d'), 'email')
        expectInvalid(email('a@d.c'), 'email')
        expectInvalid(email('a.ch'), 'email')
    })

    test('password', () => {
        expectValid(password(''))
        expectValid(password('Password1+'))
        expectValid(password('+Password1'))
        expectValid(password('1+Password'))
        expectValid(password('assword1+P'))
        expectValid(password('12p+D678'))

        expectInvalid(password('p'), 'password.to-short')
        expectInvalid(password('Pword1+'), 'password.to-short')
        expectInvalid(password('PASSWORD1+'), 'password.no-lowercase')
        expectInvalid(password('password1+'), 'password.no-uppercase')
        expectInvalid(password('Password+'), 'password.no-digits')
        expectInvalid(password('Password1'), 'password.no-special-chars')
    })

    test('matches', () => {
        const testValid = [undefined, null, '', '1', 'hello', 'So cooool']
        testValid.forEach(value => {
            expectValid(matches(value)(value))
        })

        // This rule does not allow the input to be falsy, always has to match.
        const testInvalid = ['', '1', 'hi', 'noice', 'not-null', 'not-null', 'not-null']
        const checkInvalid = ['ho', '11', 'HI', 'noices', '', null, undefined]

        testInvalid.forEach((value, index) => {
            expectInvalid(matches(value)(checkInvalid[index]), 'matches')
        })
    })

    test('regex', () => {
        expectValid(regex(/\d+/)('123'))
        expectValid(regex(/\d*/)(null))
        expectValid(regex(/\d+/)(null))

        expectInvalid(regex(/\d+/)('abc'), 'regex')
    })

    test('option', () => {
        const options1 = ['a', 'b', 'ab', 'ac', 'a']
        expectValid(option(options1)(null))
        expectValid(option(options1)('a'))
        expectValid(option(options1)('b'))
        expectValid(option(options1)('ab'))

        expectInvalid(option(options1)('c'), 'option')
        expectInvalid(option(options1)('A'), 'option')
        expectInvalid(option(options1)('aB'), 'option')
    })

    test('external', () => {
        expectValid(external(true, 'phone')('hi'))
        expectValid(external(false, 'phone')(null))
        expectInvalid(external(false, 'phone')('hi'), 'phone')
    })
})
