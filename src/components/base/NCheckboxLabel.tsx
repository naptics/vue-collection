import { createComponent, createProps } from '@/utils/component'
import NCheckbox, { nCheckboxProps } from './NCheckbox'

export const nCheckboxLabelProps = createProps({
    ...nCheckboxProps,
    /**
     * The title of the checkbox.
     */
    title: String,
    /**
     * The description of the checkbox.
     */
    description: String,
})

/**
 * The `NCheckboxLabel` is a checkbox with a title and a description.
 */
export default createComponent('NCheckboxLabel', nCheckboxLabelProps, props => {
    const toggleValue = () => {
        if (!props.disabled) props.onUpdateValue?.(!props.value)
    }

    return () => (
        <div class="flex items-center">
            <NCheckbox {...props} />
            <div class="ml-3 text-sm">
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
