import { createView } from '@/utils/vue'
import ButtonView from './presentation/ButtonView'
import CheckboxView from './presentation/CheckboxView'

export default createView('PresentationView', () => {
    return () => (
        <div class="bg-default-50">
            <div class="h-48" />
            <CheckboxView />
            <ButtonView />
        </div>
    )
})
