import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NButton from '../NButton'

describe('<NButton>', () => {
    it('shows text correctly', () => {
        const wrapper = mount(<NButton>Click me!</NButton>)
        expect(wrapper.text()).toMatch('Click me!')
    })
})
