import { type Ref, watch, type ComputedRef } from 'vue'

/**
 * Creates a watcher on the updater function, which sets the value of the ref on every change.
 * @param ref the ref to update
 * @param updater the updater funtion which provides the updates
 */
export function updateWith<T>(ref: Ref<T>, updater: () => T): void {
    watch(
        updater,
        newValue => {
            ref.value = newValue
        },
        { immediate: true }
    )
}

/**
 * Conveience function to create a watcher for a ref
 * @param ref the ref to watch
 * @param onChange the function, which is executed on change of a value
 */
export function watchRef<T>(ref: Ref<T> | ComputedRef<T>, onChange: (newValue: T) => void): void {
    watch(() => ref.value, onChange)
}
