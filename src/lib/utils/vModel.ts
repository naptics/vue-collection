/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { PropType, Ref } from 'vue'
import type { AnyObject } from './utils'

/*
 * ---------- VModel as Props ----------
 */

/**
 * Creates props for a `v-model` of the given type.
 * A `v-model` consits of a value-property and a update-function.
 * @param propType The propType of the `v-model`.
 * @returns An object containing the value-property and the update-function.
 */
export function vModelProps<T>(propType: PropType<T>) {
    return {
        /**
         * The value of the component.
         */
        value: propType as PropType<T>,
        /**
         * This will be called, when the value of the component has changed.
         */
        onUpdateValue: Function as PropType<(newValue: T) => void>,
    } as const
}

/**
 * Creates props for a required `v-model` of the given type.
 * @see {@link vModelProps}
 */
export function vModelRequiredProps<T>(propType: PropType<T>) {
    return {
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
    } as const
}

/**
 * Creates props for a `v-model` of the given type with a default value.
 * @see {@link vModelProps}
 */
export function vModelDefaultProps<T>(propType: PropType<T>, defaultValue: () => T) {
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
    } as const
}

/*
 * ---------- VModel to pass to components ----------
 */

/**
 * The `VModel` type contains a value and an optional update-function.
 * This object is passed to a component to create a two-way binding.
 */
export type VModel<T, U = T> = {
    value: T
    onUpdateValue?: (newValue: U) => void
}

/**
 * The `VModelForArray` contains the normal `VModel` properties,
 * but aditionally a function, which removes the value from the array.
 */
export type VModelForArray<T, U = T> = VModel<T, U> & {
    remove(): void
}

/**
 * Uses the given `ref` as a `v-model`, to create a two-way binding with the `ref`.
 * @param ref The `ref` which should be used as the `v-model`.
 * @returns An object of type {@link VModel}, which connects the `ref` to the `v-model`.
 */
export function vModelForRef<T>(ref: Ref<T>): VModel<T> {
    return {
        value: ref.value,
        onUpdateValue: (newValue: T) => {
            ref.value = newValue
        },
    }
}

/**
 * This creates a `v-model` for a property of an object. The property of the object is taken as the
 * value of the `v-model`, the `onUpdate` function, is called every time when the property is updated
 * with the whole object and its updated property.
 * @param object The object which contains the relevant property.
 * @param key The key of the property which should be used as the v-model.
 * @param onUpdate The updater function which is called with the entire object when the property has changed.
 * @returns An object containing of type {@link VModel}.
 * @example
 * ```tsx
 * // inside setup function
 * const customer = ref({ firstName: 'Hansi', lastName: 'Halunk' })
 *
 * // This input needs a v-model for the `firstName` property.
 * return () => (
 *     <NInput
 *         name="First Name"
 *         {...vModelForObjectProperty(customer.value, 'firstName', newVal => (customer.value = newValue))}
 *     />
 * )
 * ```
 */
export function vModelForObjectProperty<T extends AnyObject, K extends keyof T>(
    object: T,
    key: K,
    onUpdate?: (newValue: T) => void
): VModel<T[K]> {
    return {
        value: object[key],
        onUpdateValue: (newValue: T[K]) => {
            onUpdate?.({ ...object, [key]: newValue })
        },
    }
}

/**
 * This creates a `v-model` which operates on one property of a parent `v-model`. It takes the value of
 * the property as the value of the `v-model` and calls the function `onUpdateValue` of the parent `v-model`
 * whenever the property changes. This function can be seen as a kind of mapper for a `v-model`.
 * @param vModel The parent `v-model`, which this function extracts a single property from.
 * @param key The key of the relevant property.
 * @returns An object of type {@link VModel}.
 * @example
 * ```tsx
 * type Customer = { firstName: string, lastName: String }
 *
 * // inside setup function,
 * // This vModel would normally be inside the props of a component e.g., `CustomerEditor`.
 * const parentVModel = {
 *     value: { firstName: 'Hansi', lastName: 'Halunk' },
 *     onUpdateValue: (newValue: Customer) => {
 *         // update something
 *     }
 * }
 *
 * // This input needs a v-model for the `firstName` property.
 * return () => (
 *     <NInput
 *         name="First Name"
 *         {...vModelForVModelProperty(parentVModel, 'firstName'))}
 *      />
 * )
 * ```
 */
export function vModelForVModelProperty<
    Model extends VModel<ModelValue>,
    Key extends keyof ModelValue,
    ModelValue extends AnyObject = Model['value']
>(vModel: Model, key: Key): VModel<ModelValue[Key]> {
    return {
        value: vModel.value[key],
        onUpdateValue: (newValue: ModelValue[Key]) => {
            vModel.onUpdateValue?.({ ...vModel.value, [key]: newValue })
        },
    }
}

/**
 * This function does the same thing as {@link vModelForVModelProperty},
 * but can be provided with a mapper function for the modified property.
 * @see {@link vModelForVModelProperty}
 * @example
 * ```tsx
 * type Customer = { firstName: string, lastName: String, type: 'admin' | 'user' }
 *
 * // inside setup function,
 * // This vModel would normally be inside the props of a component e.g., `CustomerEditor`.
 * const parentVModel = {
 *     value: { firstName: 'Hansi', lastName: 'Halunk', type: 'user' },
 *     onUpdateValue: (newValue: Customer) => {
 *         // update something
 *     }
 * }
 *
 * // This input needs a v-model for the `type` property.
 * // Unfortunately the NSelect input expects an `onUpdateValue` with a
 * // parameter of type `string`, not type `admin | user`.
 * // So we have to provide a mapper function from `string` to `admin | user`.
 * // In this example, we just cast the value.
 * return () => (
 *     <NSelect
 *         name="Type"
 *         {...vModelForVModelPropertyMapType(parentVModel, 'type', newVal => newVal as 'admin' | 'user'))}
 *      />
 * )
 * ```
 */
export function vModelForVModelPropertyMapType<
    Model extends VModel<ModelValue>,
    Key extends keyof ModelValue,
    UpdateValue,
    ModelValue extends AnyObject = Model['value']
>(vModel: Model, key: Key, mapType: (value: UpdateValue) => ModelValue[Key]): VModel<ModelValue[Key], UpdateValue> {
    return {
        value: vModel.value[key],
        onUpdateValue: (newValue: UpdateValue) => {
            vModel.onUpdateValue?.({ ...vModel.value, [key]: mapType(newValue) })
        },
    }
}

/**
 * Creates an array of `v-models`, one for every element of an array. All changes in
 * a `v-model` of any element, will call the `onUpdate` function, with the updated array.
 * @param array The array to create `v-models` for.
 * @param onUpdate The updater function, which is called whenever an element has changed.
 * @returns An object of type {@link VModelForArray}.
 * @example
 * ```tsx
 * // inside setup function
 * const todos = ref([
 *     'Create v-model helper functions.',
 *     'Document them!'
 * ])
 *
 * // For every todo, there should be an input to modifiy it.
 * return () => (
 *     <div>
 *         {vModelsForArray(todos.value, newValue => (todos.value = newValue)).map(todoVModel => (
 *            <NInput name="Todo" {...todoVModel} />
 *         ))}
 *     </div>
 * )
 * ```
 */
export function vModelsForArray<T>(array: T[], onUpdate?: (newValue: T[]) => void): VModelForArray<T>[] {
    return array.map((entry, index) => ({
        value: entry,
        onUpdateValue: (entry: T) => {
            const newArray = [...array]
            newArray[index] = entry
            onUpdate?.(newArray)
        },
        remove: () => {
            const newArray = [...array.slice(0, index), ...array.slice(index + 1)]
            onUpdate?.(newArray)
        },
    }))
}
