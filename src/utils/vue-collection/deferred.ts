type PromiseResolve<T> = (value: T | PromiseLike<T>) => void
type PromiseReject = (reason?: unknown) => void

export type DeferredPromise<T> = {
    promise: Promise<T>
    resolve: PromiseResolve<T>
    reject: PromiseReject
}

/**
 * Utlitity to return a deferred promise, which can be resolved from outside.
 * @returns promise, resolve and reject
 */
export function deferred<T>(): DeferredPromise<T> {
    let resolve!: PromiseResolve<T>
    let reject!: PromiseReject

    const promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
    })

    return {
        promise,
        resolve,
        reject,
    }
}
