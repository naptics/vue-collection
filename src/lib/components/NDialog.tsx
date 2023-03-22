import { deferred, type DeferredPromise } from '@/lib/utils/deferred'
import { createComponent, createProps, extractProps } from '@/lib/utils/component'
import { CheckIcon, ExclamationTriangleIcon, LightBulbIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { computed, ref, type PropType } from 'vue'
import NIconCircle from './NIconCircle'
import NModal from './NModal'
import { DialogTitle } from '@headlessui/vue'
import type { HeroIcon } from '@/lib/utils/utils'
import { trsl } from '@/i18n'
import { vModelForRef } from '@/lib/utils/vModel'

export type DialogVariant = 'success' | 'info' | 'warning' | 'danger' | 'remove'

export const nDialogProps = createProps({
    /**
     * The title of the dialog.
     */
    title: String,
    /**
     * The text of the dialog.
     */
    text: String,
    /**
     * The variant of the dialog.
     * This determines the default icon and its color
     * as well as the default text and color of the ok-button.
     */
    variant: {
        type: String as PropType<DialogVariant>,
        default: 'warning',
    },
    /**
     * The icon of the alert. This overrides the `icon` of the `variant`.
     */
    icon: Function as PropType<HeroIcon>,
    /**
     * The color of the alert's icon. This overrides the `iconColor` of the `variant`.
     */
    iconColor: String,
    /**
     * The text of the ok-button. This overrides the `okText` of the `variant`.
     */
    okText: String,
    /**
     * The color of the ok-button. This overrides the `okColor` of the `variant`.
     */
    okColor: String,
    /**
     * The text of the cancel-button.
     */
    cancelText: {
        type: String,
        default: trsl('vue-collection.action.cancel'),
    },
    /**
     * The color of the cancel-button.
     */
    cancelColor: {
        type: String,
        default: 'default',
    },
    /**
     * If set to `true` the cancel-button is hidden.
     */
    hideCancel: Boolean,
})

export type NDialogExposed = {
    /**
     * Shows the alert and returns a promise.
     * When the user interaction occurs the promise is resolved.
     * It is resolved to `true` if the okButton was clicked, `false` if the dialog was cancelled.
     */
    show(): Promise<boolean>
}

/**
 * A `NDialog` is an element to interact directly with the user.
 * It can be controlled via a ref to prompt the user and to receive their answer.
 * @example
 * const dialogRef = ref<NDialogExposed>()
 * ...
 * const onShowDialog = () => {
 *   dialofRef.value?.show().then(result => {
 *     if (result)   // dialog accepted
 *     else          // dialog cancelled
 *   })
 * }
 * ...
 * <NDialog ref={dialogRef} />
 */
export default createComponent('NDialog', nDialogProps, (props, context) => {
    const showDialog = ref(false)

    let deferredPromise: DeferredPromise<boolean> | null = null
    const show = (): Promise<boolean> => {
        if (deferredPromise != null) {
            deferredPromise.reject('show() was called on the open dialog.')
            deferredPromise = null
        }
        showDialog.value = true
        deferredPromise = deferred<boolean>()
        return deferredPromise.promise
    }

    context.expose({ show })

    const resolveWith = (result: boolean) => {
        deferredPromise?.resolve(result)
        deferredPromise = null
    }

    const ok = () => resolveWith(true)
    const cancel = () => resolveWith(false)

    const defaults = computed(() => VARIANT_DEFAULTS[props.variant])

    return () => (
        <NModal
            {...vModelForRef(showDialog)}
            {...extractProps(props, 'cancelColor', 'cancelText', 'hideCancel')}
            onOk={ok}
            onCancel={cancel}
            okColor={props.okColor || defaults.value.okColor}
            okText={props.okText || defaults.value.okText}
            hideX
            hideHeader
        >
            <div class="flex space-x-4 py-2">
                <div class="flex-grow-0">
                    <NIconCircle
                        icon={props.icon || defaults.value.icon}
                        iconSize={6}
                        color={props.iconColor || defaults.value.iconColor}
                    />
                </div>

                <div class="flex-grow">
                    <DialogTitle as="h4" class="font-medium text-lg text-default-700 mb-1">
                        {props.title}
                    </DialogTitle>
                    {context.slots.default?.() || <p class="text-sm text-default-500">{props.text}</p>}
                </div>
            </div>
        </NModal>
    )
})

const VARIANT_DEFAULTS = {
    success: {
        icon: CheckIcon,
        iconColor: 'green',
        okText: trsl('vue-collection.action.all-right'),
        okColor: 'green',
    },
    info: {
        icon: LightBulbIcon,
        iconColor: 'blue',
        okText: trsl('vue-collection.action.all-right'),
        okColor: 'blue',
    },
    warning: {
        icon: ExclamationTriangleIcon,
        iconColor: 'yellow',
        okText: trsl('vue-collection.action.proceed'),
        okColor: 'yellow',
    },
    danger: {
        icon: ExclamationTriangleIcon,
        iconColor: 'red',
        okText: trsl('vue-collection.action.proceed'),
        okColor: 'red',
    },
    remove: {
        icon: TrashIcon,
        iconColor: 'red',
        okText: trsl('vue-collection.action.remove'),
        okColor: 'red',
    },
}
