import { createComponent, createProps, vModel } from '@/utils/vue'
import type { PropType } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'

export const nInputProps = createProps({
    ...vModel(String),
    name: String,
    placeholder: String,
    autocomplete: {
        type: String,
        default: 'off',
    },
    type: {
        type: String,
        default: 'text',
    },
    max: String,
    min: String,
    error: Boolean,
    disabled: Boolean,
    hideLabel: Boolean,
    small: Boolean,
    onFocus: Function as PropType<() => void>,
    onBlur: Function as PropType<() => void>,
})

export default createComponent('NInput', nInputProps, props => {
    return () => (
        <div>
            {!props.hideLabel && (
                <label
                    for={props.name}
                    class={['block text-sm font-medium mb-1', props.disabled ? 'text-default-300' : 'text-default-700']}
                >
                    {props.name}
                </label>
            )}
            <div class="relative">
                <input
                    value={props.value}
                    onInput={event => props.onUpdateValue?.((event.target as HTMLInputElement).value)}
                    placeholder={props.placeholder}
                    autocomplete={props.autocomplete}
                    type={props.type}
                    min={props.min}
                    max={props.max}
                    disabled={props.disabled}
                    onFocus={() => props.onFocus?.()}
                    onBlur={() => props.onBlur?.()}
                    class={[
                        'block w-full rounded-md border focus:outline-none focus:ring-1 ',
                        props.small ? 'text-xs py-0.5 px-2' : 'py-2 px-4',
                        props.disabled
                            ? 'text-default-500 placeholder-default-300'
                            : 'text-default-900 placeholder-default-400',
                        props.error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 pr-10'
                            : 'border-default-300 focus:border-primary-500 focus:ring-primary-500',
                    ]}
                />
                <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                    v-show={props.error && !props.small}
                >
                    <ExclamationCircleIcon class="h-5 w-5 text-red-700" aria-hidden="true" />
                </div>
            </div>
        </div>
    )
})
