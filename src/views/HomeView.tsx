import ModalView from './presentation/ModalView'
import { createView } from '@/utils/component'
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
import NavigationView from './NavigationView'
import { RouterLink } from 'vue-router'
import { ChevronDoubleUpIcon } from '@heroicons/vue/solid'
import { ref, Transition } from 'vue'
import NBadge from '@/components/base/NBadge'
import LinkView from './presentation/LinkView'

export default createView('HomeView', () => {
    const showButton = ref(false)
    window.onscroll = () => {
        const treshhold = 1000
        showButton.value = document.documentElement.scrollTop > treshhold || document.body.scrollTop > treshhold
    }

    return () => (
        <div>
            <div class="bg-gradient-to-r from-primary-500/70 to-white">
                <div
                    class="bg-gradient-to-b from-default-300/80 to-default-50 border-b-2 border-default-200 z-50"
                    id="overview"
                >
                    <div class="px-8 py-20 min-h-screen m-auto text-center max-w-4xl flex items-center justify-center flex-col">
                        <h1 class="text-6xl font-semibold mb-8">Vue Collection</h1>
                        <p class="text-3xl font-light text-default-500">
                            Styled and fully functional components created by naptics.
                        </p>
                        <NavigationView class="mt-16" />
                    </div>
                </div>
            </div>

            <div class="space-y-10">
                <AlertView />
                <ButtonView />
                <IconButtonView />
                <LinkView />
                <IconCircleView />
                <BadgeView />
                <CheckboxView />
                <DropdownView />
                <InputView />
                <SearchbarView />
                <LoadingIndicatorView />
                <ModalView />
                <ListView />
                <TableView />
                <PaginationView />
            </div>

            <Transition
                enterActiveClass="transition duration-400"
                enterFromClass="opacity-0"
                enterToClass="opacity-100"
                leaveActiveClass="transition duration-400"
                leaveFromClass="opacity-100"
                leaveToClass="opacity-0"
            >
                {showButton.value && (
                    <div class="fixed z-20 bottom-4 right-4">
                        <RouterLink to={{ hash: '#overview' }}>
                            <NBadge textSize="text-base" allCaps={false}>
                                <div class="flex items-center space-x-2">
                                    <span>Overview</span>
                                    <ChevronDoubleUpIcon class="h-5 w-5" />
                                </div>
                            </NBadge>
                        </RouterLink>
                    </div>
                )}
            </Transition>
        </div>
    )
})
