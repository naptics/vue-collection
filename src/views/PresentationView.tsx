import { createView } from '@/utils/vue'
import BadgeView from './presentation/BadgeView'
import ButtonView from './presentation/ButtonView'
import CheckboxView from './presentation/CheckboxView'

export default createView('PresentationView', () => {
    return () => (
        <div class="bg-default-50">
            <ButtonView />
            <BadgeView />
            <CheckboxView />
        </div>
    )
})
