import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NButton from '../NButton'

describe('<NButton>', () => {
    it('shows text', () => {
        const wrapper = mount(<NButton>Click me!</NButton>)
        expect(wrapper.text()).toMatch('Click me!')
    })

    it('calls onClick when clicked', async () => {
        const onClick = vi.fn()
        const wrapper = mount(<NButton onClick={onClick} />)
        await wrapper.trigger('click')
        expect(onClick).toHaveBeenCalledOnce()
        await wrapper.trigger('click')
        expect(onClick).toHaveBeenCalledTimes(2)
    })

    it('does not call onClick when disabled', async () => {
        const onClick = vi.fn()
        const wrapper = mount(<NButton onClick={onClick} disabled={true} />)
        await wrapper.trigger('click')
        expect(onClick).not.toHaveBeenCalled()
    })
})
