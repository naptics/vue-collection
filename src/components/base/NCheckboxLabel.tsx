import { createComponent, createProps } from '@/utils/vue'
import NCheckbox, { nCheckboxProps } from './NCheckbox'

export const nCheckboxLabelProps = createProps({
    ...nCheckboxProps,
    title: String,
    description: String,
})

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
                        props.disabled ? 'text-gray-300' : 'text-gray-700 cursor-pointer',
                    ]}
                >
                    {props.title}
                </label>
                <p class={props.disabled ? 'text-gray-300' : 'text-gray-500'}>
                    <span onClick={toggleValue} class={['select-none', props.disabled ? '' : 'cursor-pointer']}>
                        {props.description}
                    </span>
                </p>
            </div>
        </div>
    )
})
