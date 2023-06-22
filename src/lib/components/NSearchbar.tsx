import { trsl } from '../i18n'
import { createComponent } from '../utils/component'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { ref, type PropType } from 'vue'
import { vModelProps } from '../utils/vModel'

export const nSearchbarProps = {
    ...vModelProps(String),
    /**
     * The placeholder of the search-bar.
     */
    placeholder: {
        type: String,
        default: trsl('vue-collection.action.search'),
    },
    /**
     * If set to `true` the search-bar is displayed smaller.
     */
    small: Boolean,
    /**
     * Adds the classes directly to the input (e.g. for shadow).
     */
    inputClass: String,
    /**
     * This is called when the search-bar receives focus.
     */
    onFocus: Function as PropType<() => void>,
    /**
     * This is called when the search-bar looses focus.
     */
    onBlur: Function as PropType<() => void>,
} as const

export type NSearchbarExposed = {
    /**
     * Request focus on the search-bar.
     */
    focus(): void
}

/**
 * The `NSearchbar` is a styled input with a search icon.
 */
export default createComponent('NSearchbar', nSearchbarProps, (props, context) => {
    const inputRef = ref<HTMLInputElement>()
    const exposed: NSearchbarExposed = {
        focus: () => {
            inputRef.value?.focus()
        },
    }
    context.expose(exposed)

    return () => (
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon class="h-5 w-5 text-default-400" aria-hidden="true" />
            </div>
            <input
                ref={inputRef}
                value={props.value}
                onInput={event => props.onUpdateValue?.((event.target as HTMLInputElement).value)}
                type="text"
                name="search"
                placeholder={props.placeholder}
                autocomplete="off"
                class={[
                    'block w-full pl-10 pr-4 rounded-md border focus:outline-none focus:ring-1 transition placeholder-default-400 border-default-300 focus:border-primary-500 focus:ring-primary-500',
                    props.small ? 'py-1' : 'py-2',
                    props.inputClass,
                ]}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
            />
        </div>
    )
})
