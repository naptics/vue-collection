/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { PropType, Ref } from 'vue'
import { createProps } from './component'
import type { AnyObject } from './utils'

/**
 * Creates a v-model of the given type.
 * A v-model consits of a value-property and a update-function.
 * @param propType the propType of the v-model.
 * @returns an object containing the value-property and the update-function.
 */
export function vModel<T>(propType: PropType<T>) {
    return {
        /**
         * The value of the component.
         */
        value: propType as PropType<T>,
        /**
         * This will be called, when the value of the component has changed.
         */
        onUpdateValue: Function as PropType<(newValue: T) => void>,
    }
}

/**
 * Uses the given ref as a vmodel, assigning the value property and updating the ref from the update function.
 * @param ref the ref which should be used as the v-model
 * @returns an object containing the `value` and the `onUpdateValue` function.
 */
export function refAsVModel<T>(ref: Ref<T>) {
    return {
        value: ref.value,
        onUpdateValue: (newValue: T) => {
            ref.value = newValue
        },
    }
}

/**
 * Creates a required v-model of the given type.
 */
export function vModelRequired<T>(propType: PropType<T>) {
    return createProps({
        /**
         * The value of the component.
         */
        value: {
            type: propType as PropType<T>,
            required: true,
        },
        /**
         * This will be called, when the value of the component has changed.
         */
        onUpdateValue: Function as PropType<(newValue: T) => void>,
    })
}

/**
 * Creates a v-model of the given type with a default value
 * A v-model consits of a value-property and a update-function.
 * @param propType the propType of the v-model.
 * @returns an object containing the value-property and the update-function.
 */
export function vModelDefault<T>(propType: PropType<T>, defaultValue: () => T) {
    return {
        /**
         * The value of the component.
         */
        value: {
            type: propType as PropType<T>,
            default: defaultValue,
        },
        /**
         * This will be called, when the value of the component has changed.
         */
        onUpdateValue: Function as PropType<(newValue: T) => void>,
    }
}

/**
 * This function returns a v-model for a property in an object.
 * It replaces the boiler plate otherwise needed to modify one property of an object.
 * @param object the object which contains the relevant property
 * @param key the key of the property which should be used as the v-model
 * @param onUpdate the updater function which is called with the entire object when the property has changed.
 * @returns an object containing the properties for the v-model
 * @example
 * ```tsx
 * // boilerplate
 * <Component
 *   value={props.value.relevant}
 *   onUpdateValue={newValue => props.onUpdateValue({...props.value, relevant: newValue })}
 * />
 *
 * // with this function
 * <Component {...propertyAsVModel(props.value, 'relevant', props.onUpdateValue)} />
 * ```
 */
export function propertyAsVModel<T extends AnyObject, K extends keyof T>(
    object: T,
    key: K,
    onUpdate?: (newValue: T) => void
) {
    return {
        value: object[key],
        onUpdateValue: (newValue: T[K]) => {
            onUpdate?.({ ...object, [key]: newValue })
        },
    }
}
