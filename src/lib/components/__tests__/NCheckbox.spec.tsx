import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import NCheckbox from '../NCheckbox'

describe('<NCheckbox>', () => {
    test('handles value and calls onUpdateValue correctly', async () => {
        const onUpdateValue = vi.fn()

        let checkbox = mount(() => <NCheckbox value={false} onUpdateValue={onUpdateValue} />).get('input')
        await checkbox.trigger('click')
        expect(onUpdateValue).toHaveBeenLastCalledWith(true)
        expect(onUpdateValue).toHaveBeenCalledTimes(1)

        // test twice (should not have changed because we did not change the value)
        await checkbox.trigger('click')
        expect(onUpdateValue).toHaveBeenLastCalledWith(true)
        expect(onUpdateValue).toHaveBeenCalledTimes(2)

        onUpdateValue.mockReset()
        checkbox = mount(() => <NCheckbox value={true} onUpdateValue={onUpdateValue} />).get('input')

        await checkbox.trigger('click')
        expect(onUpdateValue).toHaveBeenLastCalledWith(false)
        expect(onUpdateValue).toHaveBeenCalledTimes(1)

        // test twice (should not have changed because we did not change the value)
        await checkbox.trigger('click')
        expect(onUpdateValue).toHaveBeenLastCalledWith(false)
        expect(onUpdateValue).toHaveBeenCalledTimes(2)
    })

    test('does not call onUpdateValue when disabled', async () => {
        const onUpdateValue = vi.fn()

        const checkbox = mount(() => <NCheckbox disabled onUpdateValue={onUpdateValue} />).get('input')
        await checkbox.trigger('click')
        expect(onUpdateValue).not.toHaveBeenCalled()
    })
})
