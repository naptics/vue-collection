import { createView } from '@/utils/vue'
import ButtonView from './presentation/ButtonView'
import CheckboxView from './presentation/CheckboxView'

export default createView('PresentationView', () => {
    return () => (
        <div class="bg-default-50">
            <CheckboxView />
            <div class="h-48" />
            <ButtonView />
        </div>
    )
})
