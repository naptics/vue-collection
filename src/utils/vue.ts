import { type Ref, watch } from 'vue'

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
