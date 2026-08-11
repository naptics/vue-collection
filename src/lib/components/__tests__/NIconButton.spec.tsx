import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NIconButton from '../NIconButton'
import type { HeroIcon } from '../../utils/tailwind'

const TestIcon: HeroIcon = props => <svg {...props} />

describe('<NIconButton>', () => {
    it('disables pointer events when disabled', () => {
        const button = mount(() => <NIconButton icon={TestIcon} disabled={true} />).get('button')
        expect(button.classes()).toContain('pointer-events-none')
    })
})
