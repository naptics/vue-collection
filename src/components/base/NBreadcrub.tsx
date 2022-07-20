import { createComponent, createProps } from '@/utils/component'
import type { HeroIcon, TWTextSize } from '@/utils/utils'
import { ChevronRightIcon } from '@heroicons/vue/solid'
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import NLink from './NLink'

export const nBreadcrumbProps = createProps({
    /**
     * The items of the breadcrumb.
     */
    items: {
        type: Array as PropType<BreadcrumbItem[]>,
        default: () => [],
    },
    /**
     * The color of the breadcrumbs text and icons.
     */
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * The text-size of the breadcrumb labels.
     */
    textSize: {
        type: String as PropType<TWTextSize>,
        default: 'text-base',
    },
    /**
     * The icon which is used as a seperator between two breadcrumb items.
     */
    icon: {
        type: Function as PropType<HeroIcon>,
        default: ChevronRightIcon,
    },
    /**
     * The size of the icon in tailwind units.
     */
    iconSize: {
        type: Number,
        default: 5,
    },
    /**
     * A slot the replace the breadcrumb labels.
     */
    item: Function as PropType<(item: BreadcrumbItem, index: number) => JSX.Element>,
    /**
     * A slot to replace the separators between the breadcrumb labels.
     * The passsed item is the item before the seperator.
     */
    seperator: Function as PropType<(item: BreadcrumbItem, index: number) => JSX.Element>,
})

export type BreadcrumbItem = {
    /**
     * The visible label of the breadcrumb item.
     */
    label: string
    /**
     * The route the breadcrumb item points to.
     */
    route: RouteLocationRaw
}

/**
 * The `NBreadcrumb` is a styled breadcrumb which can be used as a navigation in hierarchical views.
 */
export default createComponent('NBreadcrumb', nBreadcrumbProps, props => {
    return () => (
        <div class="flex flex-wrap items-center">
            {props.items.map((item, index) => (
                <>
                    {props.item?.(item, index) || (
                        <NLink textSize={props.textSize} route={item.route} color={props.color}>
                            {item.label}
                        </NLink>
                    )}

                    {index < props.items.length - 1 &&
                        (props.seperator?.(item, index) || (
                            <props.icon
                                class={`w-${props.iconSize} h-${props.iconSize} text-${props.color}-500 mx-2`}
                            />
                        ))}
                </>
            ))}
        </div>
    )
})
