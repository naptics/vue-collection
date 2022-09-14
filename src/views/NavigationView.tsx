import NBadge from '@/components/base/NBadge'
import { createView } from '@/utils/component'
import { RouterLink } from 'vue-router'

export default createView('NavigationView', () => {
    const sections = [
        { hash: 'alerts', label: 'Alerts' },
        { hash: 'buttons', label: 'Buttons' },
        { hash: 'icon-buttons', label: 'Icon Buttons' },
        { hash: 'links', label: 'Links' },
        { hash: 'icon-circles', label: 'Icon Circles' },
        { hash: 'badges', label: 'Badges' },
        { hash: 'breadcrumbs', label: 'Breadcrumbs' },
        { hash: 'checkboxes', label: 'Checkboxes' },
        { hash: 'dropdowns', label: 'Dropdowns' },
        { hash: 'inputs', label: 'Inputs and Forms' },
        { hash: 'searchbars', label: 'Searchbars' },
        { hash: 'loading-indicators', label: 'Loading Indicators' },
        { hash: 'modals', label: 'Modals' },
        { hash: 'lists', label: 'Lists' },
        { hash: 'tables', label: 'Tables' },
        { hash: 'tooltips', label: 'Tooltips' },
        { hash: 'pagination', label: 'Pagination' },
        { hash: 'dropzones', label: 'Dropzones' },
    ]

    return () => (
        <div>
            <div class="flex flex-wrap gap-6 justify-center">
                {sections.map(section => (
                    <RouterLink
                        to={{ hash: `#${section.hash}` }}
                        class="outline-none focus-visible:ring-2 focus-visible ring-primary-500 rounded-md"
                    >
                        <NBadge color="primary" allCaps={false} textSize="text-2xl">
                            {section.label}
                        </NBadge>
                    </RouterLink>
                ))}
            </div>
        </div>
    )
})
