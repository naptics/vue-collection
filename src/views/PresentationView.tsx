import ModalView from './presentation/ModalView'
import { createView } from '@/utils/vue'
import AlertView from './presentation/AlertView'
import BadgeView from './presentation/BadgeView'
import ButtonView from './presentation/ButtonView'
import CheckboxView from './presentation/CheckboxView'
import IconButtonView from './presentation/IconButtonView'
import DropdownView from './presentation/DropdownView'
import IconCircleView from './presentation/IconCircleView'
import InputView from './presentation/InputView'
import ListView from './presentation/ListView'
import LoadingIndicatorView from './presentation/LoadingIndicatorView'
import PaginationView from './presentation/PaginationView'
import SearchbarView from './presentation/SearchbarView'
import TableView from './presentation/TableView'

export default createView('PresentationView', () => {
    return () => (
        <div class="space-y-10">
            <SearchbarView />
            <TableView />

            <AlertView />
            <ButtonView />
            <IconButtonView />
            <IconCircleView />
            <BadgeView />
            <CheckboxView />
            <DropdownView />
            <InputView />
            <ListView />
            <LoadingIndicatorView />
            <ModalView />
            <PaginationView />
        </div>
    )
})
