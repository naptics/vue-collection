import { createComponent, createProps } from '@/utils/vue-collection/component'
import { ref, type PropType } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'
import NTooltip, { mapTooltipProps, nToolTipPropsForImplementor } from './NTooltip'
import './NInput.css'
import { vModel } from '@/utils/vue-collection/vModel'

export const nInputProps = createProps({
    ...vModel(String),
    /**
     * The name of the input. Is displayed as a label above the input.
     */
    name: String,
    /**
     * The placeholder of the input.
     */
    placeholder: String,
    /**
     * The html autocomplete attribute of the input.
     */
    autocomplete: {
        type: String,
        default: 'off',
    },
    /**
     * The html type attribute of the input.
     */
    type: {
        type: String,
        default: 'text',
    },
    /**
     * The maximum value of the input.
     */
    max: String,
    /**
     * The minimum value of the input.
     */
    min: String,
    /**
     * If set to `true` the input is displayed with a red border.
     */
    error: Boolean,
    /**
     * If set to `true` the input is disabled and no interaction is possible.
     */
    disabled: Boolean,
    /**
     * If set to `true` the input is displayed smaller.
     */
    small: Boolean,
    /**
     * If set to `true` the input's label is hidden.
     */
    hideLabel: Boolean,
    /**
     * This is called when the input reveices focus.
     */
    onFocus: Function as PropType<() => void>,
    /**
     * This is called when the input looses focus.
     */
    onBlur: Function as PropType<() => void>,
    ...nToolTipPropsForImplementor,
})

export type NInputExposed = {
    /**
     * Request focus on the input.
     */
    focus(): void
}

/**
 * The base class of inputs. A styled input with a lot of configuration possibilities but no validation.
 */
export default createComponent('NInput', nInputProps, (props, context) => {
    const inputRef = ref<HTMLInputElement>()
    const exposed: NInputExposed = {
        focus: () => inputRef.value?.focus(),
    }
    context.expose(exposed)

    return () => (
        <div>
            {props.name && !props.hideLabel && (
                <label
                    for={props.name}
                    class={['block text-sm font-medium mb-1', props.disabled ? 'text-default-300' : 'text-default-700']}
                >
                    {props.name}
                </label>
            )}
            <NTooltip block {...mapTooltipProps(props)}>
                <div class="relative">
                    <input
                        ref={inputRef}
                        name={props.name}
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
                        onInvalid={event => event.preventDefault()}
                        class={[
                            'block w-full rounded-md border focus:outline-none focus:ring-1 ',
                            props.small ? 'text-xs py-0.5 px-2' : 'py-2 px-4',
                            props.disabled
                                ? 'text-default-500 placeholder-default-300 bg-default-50'
                                : 'text-default-900 placeholder-default-400 ',
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
            </NTooltip>
        </div>
    )
})
