import { createComponent, createProps, vModel } from '@/utils/component'
import { nextTick, ref } from 'vue'

export const nCheckboxProps = createProps({
    ...vModel(Boolean),
    /**
     * The color of the checkbox.
     */
    color: {
        type: String,
        default: 'primary',
    },
    /**
     * If set to `true` the checkbox is disabled and no interaction is possible.
     */
    disabled: Boolean,
})

/**
 * The `NCheckbox` is a styled checkbox.
 */
export default createComponent('NCheckbox', nCheckboxProps, props => {
    const toggle = () => {
        props.onUpdateValue?.(!props.value)
        forceUpdate()
    }

    const checkBoxRef = ref<InstanceType<typeof HTMLElement>>()

    const updateKey = ref(0)
    const forceUpdate = () => {
        updateKey.value += 1
        nextTick(() => checkBoxRef.value?.focus())
    }

    return () => (
        <input
            type="checkbox"
            ref={checkBoxRef}
            checked={props.value}
            disabled={props.disabled}
            onClick={toggle}
            key={updateKey.value}
            class={[
                `h-5 w-5 border-default-300 rounded focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-${props.color}-500`,
                props.disabled
                    ? `cursor-default bg-default-100 text-${props.color}-200`
                    : `cursor-pointer text-${props.color}-400`,
            ]}
        />
    )
})
