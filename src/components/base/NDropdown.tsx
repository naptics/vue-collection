import { createComponent, createProps } from '@/utils/vue'
import { computed, Transition, type PropType } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/outline'

export const nDropdownProps = createProps({
    text: String,
    items: {
        type: Array as PropType<DropdownItem[] | DropdownItem[][]>,
        default: () => [],
    },
    right: Boolean,
    disabled: Boolean,
    /**
     * A slot to replace the button of the dropdown
     */
    button: Function as PropType<() => JSX.Element>,
})

export default createComponent('NDropdown', nDropdownProps, (props, { slots }) => {
    const items = computed<DropdownItem[][]>(() => {
        if (props.items.length == 0) return []
        if (Array.isArray(props.items[0])) return props.items as DropdownItem[][]
        else return [props.items] as DropdownItem[][]
    })

    const itemWithIcon = (item: DropdownItem) => (
        <div class="flex space-x-3 items-center">
            {item.icon && (
                <div class={['h-5 w-5', item.disabled ? 'text-default-300' : 'text-default-400']}> {item.icon()}</div>
            )}
            <span>{item.label}</span>
        </div>
    )

    return () => (
        <Menu as="div" class="relative inline-block text-left">
            <div class="flex">
                {props.button?.() || (
                    <MenuButton
                        disabled={props.disabled}
                        class={[
                            'shadow inline-flex justify-center w-full rounded-md border bg-white border-default-300 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary-500',
                            props.disabled
                                ? 'text-default-300 cursor-default'
                                : 'text-default-700 hover:bg-default-100',
                        ]}
                    >
                        {props.text}
                        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                                                        onClick={item.action}
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

export type DropdownItem = {
    label: string
    // eslint-disable-next-line @typescript-eslint/ban-types
    icon?: Function
    route?: RouteLocationRaw
    disabled?: boolean
    action?: () => void
}
