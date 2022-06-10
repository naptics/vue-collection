import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NButton from '../NButton'

describe('<NButton>', () => {
    it('shows text', () => {
        const button = mount(<NButton>Click me!</NButton>)
        expect(button.text()).toMatch('Click me!')
    })

    it('calls onClick when clicked', async () => {
        const onClick = vi.fn()
        const button = mount(<NButton onClick={onClick} />)
        await button.trigger('click')
        expect(onClick).toHaveBeenCalledOnce()
        await button.trigger('click')
        expect(onClick).toHaveBeenCalledTimes(2)
    })

    it('does not call onClick when disabled', async () => {
        const onClick = vi.fn()
        const button = mount(<NButton onClick={onClick} disabled={true} />)
        await button.trigger('click')
        expect(onClick).not.toHaveBeenCalled()
    })
})
