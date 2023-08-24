import { trsl } from '../i18n'
import { createComponent } from '../utils/component'
import type { Identifiable } from '../utils/identifiable'
import { ref, type PropType } from 'vue'
import NTooltip, { mapTooltipProps, nToolTipPropsForImplementor } from './NTooltip'
import NValInput, { nValInputProps, type NValInputExposed } from './NValInput'

export const nSelectProps = {
    /**
     * The id of the currently selected option of this input.
     */
    value: String,
    /**
     * This is called with the newly selected id when the selection has changed.
     * If no id is selected, the empty string is passed, in order to
     * match the API of all other inputs who never pass `undefined`.
     */
    onUpdateValue: Function as PropType<(newValue: string) => void>,
    /**
     * The different options which can be selected.
     */
    options: {
        type: Array as PropType<SelectionOption[]>,
        default: () => [],
    },
    /**
     * The value which is shown in the empty state.
     * The "nothing-option" will be called like this.
     */
    placeholder: {
        type: String,
        default: () => trsl('vue-collection.action.select'),
    },
    /**
     * @see {@link nValInputProps.name}
     */
    name: nValInputProps.name,
    /**
     * @see {@link nValInputProps.optional}
     */
    optional: nValInputProps.optional,
    /**
     * @see {@link nValInputProps.disabled}
     */
    disabled: nValInputProps.disabled,
    /**
     * @see {@link nValInputProps.form}
     */
    form: nValInputProps.form,
    /**
     * @see {@link nValInputProps.hideLabel}
     */
    hideLabel: nValInputProps.hideLabel,
    /**
     * @see {@link nValInputProps.inputClass}
     */
    inputClass: nValInputProps.inputClass,
    ...nToolTipPropsForImplementor,
} as const

export type SelectionOption = Identifiable & { label: string }
export type NSelectExposed = NValInputExposed

/**
 * The `NSelect` is a styled html select-input.
 */
const Component = createComponent('NSelect', nSelectProps, (props, context) => {
    const inputRef = ref<NSelectExposed>()
    const exposed: NSelectExposed = {
        focus: () => inputRef.value?.focus(),
        validate: () => {
            if (inputRef.value == null) throw new Error('Can not validate NSelect as its input was undefined')
            return inputRef.value.validate()
        },
        reset: () => inputRef.value?.reset(),
    }
    context.expose(exposed)

    return () => (
        <NValInput
            ref={inputRef}
            {...props}
            input={slotProps => (
                <>
                    {props.name && !props.hideLabel && (
                        <label
                            for={props.name}
                            class={[
                                'block text-sm font-medium mb-1',
                                props.disabled ? 'text-default-300' : 'text-default-700',
                            ]}
                        >
                            {props.name}
                        </label>
                    )}
                    <NTooltip block {...mapTooltipProps(props)}>
                        <select
                            name={props.name}
                            disabled={props.disabled}
                            value={props.value}
                            onChange={event => slotProps.onUpdateValue((event.target as HTMLInputElement).value)}
                            onBlur={slotProps.onBlur}
                            class={[
                                'block w-full py-2 pl-4 pr-10 rounded-md border focus:outline-none focus:ring-1',
                                props.disabled ? 'text-default-300 ' : 'text-default-900 ',
                                slotProps.error
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-default-300 focus:border-primary-500 focus:ring-primary-500',
                                props.inputClass,
                            ]}
                        >
                            <option disabled={!props.optional} selected={!props.value} value="">
                                {props.placeholder}
                            </option>
                            {props.options.map(option => (
                                <option key={option.id} value={option.id} selected={props.value == option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </NTooltip>
                </>
            )}
        />
    )
})

export { Component as NSelect, Component as default }
