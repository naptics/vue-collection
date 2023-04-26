import { createComponentWithSlots } from '../utils/component'
import { computed, Transition, type PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import type { HeroIcon } from '../utils/tailwind'

export const nDropdownProps = {
    /**
     * The title of the dropdown-button.
     */
    title: String,
    /**
     * The items of the dropdown.
     * The second dimension of the array is used
     * to create groups of items, which are visually seperated.
     */
    items: {
        type: Array as PropType<DropdownItem[] | DropdownItem[][]>,
        default: () => [],
    },
    /**
     * If set to `true` the panel is right-aligned to the button.
     */
    right: Boolean,
    /**
     * If set to `true` the dropdown-button is disabled and no interaction is possible.
     */
    disabled: Boolean,
    /**
     * Adds the classes to the Button of the dropdown.
     */
    buttonClass: String,
    /**
     * A slot to replace the button of the dropdown.
     * The passed parameter is the HeadlessUI `MenuButton` which should be
     * used to create the button for the Dropdown to work properly.
     */
    button: Function as PropType<(button: typeof MenuButton) => JSX.Element>,
} as const

export type DropdownItem = {
    /**
     * The label of the dropdown-item.
     */
    label: string
    /**
     * The icon of the dropdown-item. Is displayed to the left of the text.
     */
    icon?: HeroIcon
    /**
     * The route of the dropdown-item. If this is set, the dropdown-item is a {@link RouterLink}.
     */
    route?: RouteLocationRaw
    /**
     * If set to `true` the dropdown-item is disabled and no interaction is possible.
     * The other dropdown-items can still be clicked.
     */
    disabled?: boolean
    /**
     * This is called when the dropdown-item is clicked.
     * It is only called when the `route` option is not set on the item.
     */
    onClick?: () => void
}

/**
 * The `NDropdown` consists of a button and a panel with multiple actions.
 * It is useful to group multiple actions together in one place.
 */
export default createComponentWithSlots('NDropdown', nDropdownProps, ['button'], (props, { slots }) => {
    const items = computed<DropdownItem[][]>(() => {
        if (props.items.length == 0) return []
        if (Array.isArray(props.items[0])) return props.items as DropdownItem[][]
        else return [props.items] as DropdownItem[][]
    })

    const itemWithIcon = (item: DropdownItem) => (
        <div class="flex space-x-3 items-center">
            {item.icon && <item.icon class={['h-5 w-5', item.disabled ? 'text-default-300' : 'text-default-400']} />}
            <span>{item.label}</span>
        </div>
    )

    return () => (
        <Menu as="div" class={`relative inline-block text-left`}>
            <div class="flex">
                {props.button?.(MenuButton) || (
                    <MenuButton
                        disabled={props.disabled}
                        class={[
                            'shadow w-full flex justify-between items-center text-default-700 rounded-md border bg-white border-default-300 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary-500',
                            props.disabled ? 'text-opacity-20 cursor-default' : 'hover:bg-default-100',
                            props.buttonClass,
                        ]}
                    >
                        <span>{props.title}</span>
                        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    </MenuButton>
                )}
            </div>

            <Transition
                enterActiveClass="transition ease-out duration-100"
                enterFromClass="transform opacity-0 scale-95"
                enterToClass="transform opacity-100 scale-100"
                leaveActiveClass="transition ease-in duration-75"
                leaveFromClass="transform opacity-100 scale-100"
                leaveToClass="transform opacity-0 scale-95"
            >
                <MenuItems
                    class={[
                        'z-10 absolute w-56 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
                        props.right ? 'origin-top-right right-0' : 'origin-top-left left-0',
                    ]}
                >
                    {slots.default?.() || (
                        <div class="divide-y divide-default-200">
                            {items.value.map((group, index) => (
                                <div key={`group-${index}`} class="py-1">
                                    {group.map((item, index) => (
                                        <MenuItem key={`item-${index}`} disabled={item.disabled}>
                                            {({ active }: { active: boolean }) =>
                                                item.disabled ? (
                                                    <div class="block px-4 py-2 text-sm text-default-300">
                                                        {itemWithIcon(item)}
                                                    </div>
                                                ) : item.route ? (
                                                    <RouterLink
                                                        to={item.route}
                                                        class={[
                                                            'block px-4 py-2 text-sm',
                                                            active
                                                                ? 'bg-default-100 text-default-900'
                                                                : 'text-default-700',
                                                        ]}
                                                    >
                                                        {itemWithIcon(item)}
                                                    </RouterLink>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={item.onClick}
                                                        class={[
                                                            'w-full text-left px-4 py-2 text-sm',
                                                            active
                                                                ? 'bg-default-100 text-default-900'
                                                                : 'text-default-700',
                                                        ]}
                                                    >
                                                        {itemWithIcon(item)}
                                                    </button>
                                                )
                                            }
                                        </MenuItem>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </MenuItems>
            </Transition>
        </Menu>
    )
})
