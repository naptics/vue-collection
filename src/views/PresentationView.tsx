import { createView } from '@/utils/vue'
import ButtonView from './presentation/ButtonView'

export default createView('PresentationView', () => {
    return () => (
        <div>
            <ButtonView />
        </div>
    )
})
