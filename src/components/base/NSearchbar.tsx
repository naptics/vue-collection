import { createComponent, createProps, vModel } from '@/utils/vue'
import { SearchIcon } from '@heroicons/vue/solid'

export const nSearchbarProps = createProps({
    ...vModel(String),
    placeholder: {
        type: String,
        default: 'Suchen', //trsl('input.property.search'),
    },
    small: Boolean,
    /**
     * Add classes directly to the input (e.g. for shadow).
     */
    inputClass: String,
})

export default createComponent('NSearchbar', nSearchbarProps, props => {
    return () => (
        <div>
            <label for="search" class="sr-only">
                {props.placeholder}
            </label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon class="h-5 w-5 text-default-400" aria-hidden="true" />
                </div>
                <input
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
                />
            </div>
        </div>
    )
})
