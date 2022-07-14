import NBadge from '@/components/base/NBadge'
import { createView } from '@/utils/vue'
import { RouterLink } from 'vue-router'

export default createView('NavigationView', () => {
    const sections = [
        { hash: 'alerts', label: 'Alerts' },
        { hash: 'buttons', label: 'Buttons' },
        { hash: 'icon-buttons', label: 'Icon Buttons' },
        { hash: 'icon-circles', label: 'Icon Circles' },
        { hash: 'badges', label: 'Badges' },
        { hash: 'checkboxes', label: 'Checkboxes' },
        { hash: 'dropdowns', label: 'Dropdowns' },
        { hash: 'inputs', label: 'Inputs and Forms' },
        { hash: 'searchbars', label: 'Searchbars' },
        { hash: 'loading-indicators', label: 'Loading Indicators' },
        { hash: 'modals', label: 'Modals' },
        { hash: 'lists', label: 'Lists' },
        { hash: 'tables', label: 'Tables' },
        { hash: 'pagination', label: 'Pagination' },
    ]

    return () => (
        <div>
            {/* <h2 class="text-3xl font-semibold"> Components </h2>
            <p class="text-lg font-light  text-default-500"> Click on a component to look at it or start scrolling. </p> */}
            <div class="flex flex-wrap gap-6 justify-center">
                {sections.map(section => (
                    <RouterLink to={{ hash: `#${section.hash}` }}>
                        <NBadge color="primary" allCaps={false} textSize="text-2xl">
                            {section.label}
                        </NBadge>
                    </RouterLink>
                ))}
            </div>
        </div>
    )
})
