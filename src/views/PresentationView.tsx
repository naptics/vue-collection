import ModalView from './presentation/ModalView'
import { createView } from '@/utils/vue'
import AlertView from './presentation/AlertView'
import BadgeView from './presentation/BadgeView'
import ButtonView from './presentation/ButtonView'
import CheckboxView from './presentation/CheckboxView'
import IconButtonView from './presentation/IconButtonView'
import DropdownView from './presentation/DropdownView'

export default createView('PresentationView', () => {
    return () => (
        <div class="bg-default-50">
            <AlertView />
            <ButtonView />
            <IconButtonView />
            <BadgeView />
            <CheckboxView />
            <DropdownView />
            <ModalView />
        </div>
    )
})
