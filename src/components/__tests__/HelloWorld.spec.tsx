import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld'

describe('HelloWorld', () => {
    it('renders properly', () => {
        const wrapper = mount(HelloWorld, { props: { msg: 'hi' } })

        expect(wrapper.text()).toContain('hi')
    })
})
