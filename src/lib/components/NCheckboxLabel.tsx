import { createComponent } from '../utils/component'
import NCheckbox, { nCheckboxProps } from './NCheckbox'

export const nCheckboxLabelProps = {
    ...nCheckboxProps,
    /**
     * The title of the checkbox.
     */
    title: String,
    /**
     * The description of the checkbox.
     */
    description: String,
    /**
     * If set to `true`, a smaller margin is applied between the label and the checkbox.
     */
    compact: Boolean,
} as const

/**
 * The `NCheckboxLabel` is a checkbox with a title and a description.
 */
const Component = createComponent('NCheckboxLabel', nCheckboxLabelProps, props => {
    const toggleValue = () => {
        if (!props.disabled) props.onUpdateValue?.(!props.value)
    }

    return () => (
        <div class={`flex ${props.description ? 'items-start' : 'items-center'}`}>
            <NCheckbox {...props} class={props.description ? 'mt-1' : ''} />
            <div class={`${props.compact ? 'ml-2' : 'ml-3'} text-sm`}>
                <label
                    onClick={toggleValue}
                    class={[
                        'font-medium select-none',
                        props.disabled ? 'text-default-300' : 'text-default-700 cursor-pointer',
                    ]}
                >
                    {props.title}
                </label>
                <p class={props.disabled ? 'text-default-300' : 'text-default-500'}>
                    <span onClick={toggleValue} class={['select-none', props.disabled ? '' : 'cursor-pointer']}>
                        {props.description}
                    </span>
                </p>
            </div>
        </div>
    )
})

export { Component as NCheckboxLabel, Component as default }
