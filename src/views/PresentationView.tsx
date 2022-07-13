import { createView } from '@/utils/vue'
import AlertView from './presentation/AlertView'
import BadgeView from './presentation/BadgeView'
import ButtonView from './presentation/ButtonView'
import CheckboxView from './presentation/CheckboxView'

export default createView('PresentationView', () => {
    return () => (
        <div class="bg-default-50">
            <AlertView />
            {/* <div class="h-48" /> */}
            <ButtonView />
            <BadgeView />
            <CheckboxView />
        </div>
    )
})
