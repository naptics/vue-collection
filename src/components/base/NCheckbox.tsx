import { createComponent, createProps, vModel } from '@/utils/vue'
import { nextTick, ref } from 'vue'

export const nCheckboxProps = createProps({
    ...vModel(Boolean),
    color: {
        type: String,
        default: 'primary',
    },
    disabled: Boolean,
})

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
            onKeydownEnter={toggle}
            key={updateKey.value}
            classs={[
                `h-4 w-4 border-gray-300 rounded focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-${props.color}-500`,
                props.disabled
                    ? `cursor-default bg-gray-100 text-${props.color}-200`
                    : `cursor-pointer text-${props.color}-500`,
            ]}
        />
    )
})
