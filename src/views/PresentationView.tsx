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
            <div id="alerts">
                <AlertView />
            </div>
            <div id="buttons">
                <ButtonView />
            </div>
            <div id="icon-buttons">
                <IconButtonView />
            </div>
            <div id="icon-circles">
                <IconCircleView />
            </div>
            <div id="badges">
                <BadgeView />
            </div>
            <div id="checkboxes">
                <CheckboxView />
            </div>
            <div id="dropdowns">
                <DropdownView />
            </div>
            <div id="inputs">
                <InputView />
            </div>
            <div id="searchbars">
                <SearchbarView />
            </div>
            <div id="loading-indicators">
                <LoadingIndicatorView />
            </div>
            <div id="modals">
                <ModalView />
            </div>
            <div id="lists">
                <ListView />
            </div>
            <div id="tables">
                <TableView />
            </div>
            <div id="pagination">
                <PaginationView />
            </div>
        </div>
    )
})
