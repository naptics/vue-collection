import { createComponent, createProps, vModel } from '@/utils/vue'
import { ref, type PropType } from 'vue'
import NValInput, { type NValInputExposed } from './NValInput'

export const nSelectProps = createProps({
    ...vModel(String),
    name: String,
    options: {
        type: Array as PropType<SelectionOption[]>,
        default: () => [],
    },
    optional: Boolean,
    disabled: Boolean,
})

export type SelectionOption = {
    key: string
    label: string
}

export type NSelectExposed = NValInputExposed

export default createComponent('NSelect', nSelectProps, (props, context) => {
    const inputRef = ref<NValInputExposed>()

    context.expose({
        validate: () => inputRef.value?.validate(),
        reset: () => inputRef.value?.reset(),
    })

    return () => (
        <NValInput
            ref={inputRef}
            {...props}
            input={slotProps => (
                <>
                    <label
                        for={props.name}
                        class={[
                            'block text-sm font-medium mb-1',
                            props.disabled ? 'text-default-300' : 'text-default-700',
                        ]}
                    >
                        {props.name}
                    </label>
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
                        ]}
                    >
                        <option disabled={!props.optional} selected={!props.value} value="">
                            Auswählen {/* { $t('input.action.select') } */}
                        </option>
                        {props.options.map(option => (
                            <option key={option.key} value={option.key} selected={props.value == option.key}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </>
            )}
        />
    )
})
