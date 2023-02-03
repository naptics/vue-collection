import { createComponent, createProps } from '@/utils/vue-collection/component'
import { ref, type PropType } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'
import NTooltip, { mapTooltipProps, nToolTipPropsForImplementor } from './NTooltip'
import { vModelProps } from '@/utils/vue-collection/vModel'
import NValInput, { validationProps } from './NValInput'

const nTextAreaBaseProps = createProps({
    ...vModelProps(String),
    /**
     * The name of the text area. Is displayed as a label above the text area.
     */
    name: String,
    /**
     * The placeholder of the text area.
     */
    placeholder: String,
    /**
     * The html autocomplete attribute of the text area.
     */
    autocomplete: {
        type: String,
        default: 'off',
    },
    /**
     * If set to `true`, the text area is resizable in y-direction.
     */
    resizable: {
        type: Boolean,
        default: true,
    },
    /**
     * The initial height of the text area in terms of
     * how many text rows fit inside the text area.
     * The height can be change if {@link nTextAreaProps.resizable} is `true`
     */
    rows: Number,
    /**
     * The maximum length of the input string. Entering longer strings are simply
     * prevented, but no error message is shown to the user.
     */
    maxLength: Number,
    /**
     * If set to `true` the text area is displayed with a red border.
     */
    error: Boolean,
    /**
     * If set to `true` the text area is disabled and no interaction is possible.
     */
    disabled: Boolean,
    /**
     * If set to `true` the text area's label is hidden.
     */
    hideLabel: Boolean,
    /**
     * This is called when the text area reveices focus.
     */
    onFocus: Function as PropType<() => void>,
    /**
     * This is called when the text area looses focus.
     */
    onBlur: Function as PropType<() => void>,
    ...nToolTipPropsForImplementor,
})

export const nTextAreaProps = createProps({
    ...nTextAreaBaseProps,
    ...validationProps,
})

export type NTextAreaExposed = {
    /**
     * Request focus on the text area.
     */
    focus(): void
}

export default createComponent('NTextArea', nTextAreaProps, (props, context) => {
    const textAreaRef = ref<NTextAreaExposed>()
    const exposed: NTextAreaExposed = {
        focus: () => textAreaRef.value?.focus(),
    }
    context.expose(exposed)

    return () => (
        <NValInput
            {...props}
            input={({ error, onBlur, onUpdateValue }) => (
                <NTextAreaBase ref={textAreaRef} {...{ ...props, error, onBlur, onUpdateValue }} />
            )}
        />
    )
})

/**
 * The `NTextArea` wraps the html text area with all the features from {@link NInput} and {@link NValInput}.
 */
const NTextAreaBase = createComponent('NTextAreaBase', nTextAreaBaseProps, (props, context) => {
    const textAreaRef = ref<HTMLTextAreaElement>()
    const exposed: NTextAreaExposed = {
        focus: () => textAreaRef.value?.focus(),
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
                    <textarea
                        ref={textAreaRef}
                        name={props.name}
                        value={props.value}
                        onInput={event => props.onUpdateValue?.((event.target as HTMLInputElement).value)}
                        placeholder={props.placeholder}
                        autocomplete={props.autocomplete}
                        disabled={props.disabled}
                        rows={props.rows}
                        maxlength={props.maxLength}
                        onFocus={() => props.onFocus?.()}
                        onBlur={() => props.onBlur?.()}
                        onInvalid={event => event.preventDefault()}
                        class={[
                            'block w-full rounded-md border focus:outline-none focus:ring-1 ',
                            props.disabled
                                ? 'text-default-500 placeholder-default-300 bg-default-50'
                                : 'text-default-900 placeholder-default-400 ',
                            props.error
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500 pr-10'
                                : 'border-default-300 focus:border-primary-500 focus:ring-primary-500',
                            props.resizable ? 'resize-y' : 'resize-none',
                        ]}
                    />

                    <div
                        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                        v-show={props.error}
                    >
                        <ExclamationCircleIcon class="h-5 w-5 text-red-700" aria-hidden="true" />
                    </div>
                </div>
            </NTooltip>
        </div>
    )
})
