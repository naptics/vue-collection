import { deferred, type DeferredPromise } from '@/utils/deferred'
import { createComponent, createProps, extractProps, refAsVModel } from '@/utils/component'
import { CheckIcon, ExclamationIcon, LightBulbIcon, TrashIcon } from '@heroicons/vue/outline'
import { computed, ref, type PropType } from 'vue'
import NIconCircle from './NIconCircle'
import NModal from './NModal'
import { DialogTitle } from '@headlessui/vue'
import type { HeroIcon } from '@/utils/utils'
import { trsl } from '@/i18n'

export type DialogVariant = 'success' | 'info' | 'warning' | 'error' | 'remove'

export const nDialogProps = createProps({
    title: String,
    text: String,
    size: {
        type: String,
        default: 'sm',
    },
    variant: {
        type: String as PropType<DialogVariant>,
        default: 'warning',
    },
    icon: Function as PropType<HeroIcon>,
    iconColor: String,
    okText: String,
    okColor: String,
    cancelText: {
        type: String,
        default: trsl('general.action.cancel'),
    },
    cancelColor: {
        type: String,
        default: 'default',
    },
    hideCancel: Boolean,
})

export type NDialogExposed = {
    /**
     * Shows the alert and returns a promise.
     * When the user interaction occurs the promise is resolved.
     * It is resolved to `true` if clicks on the okButton, `false` if the dialog is cancelled.
     */
    show(): Promise<boolean>
}

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
            {...refAsVModel(showDialog)}
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
        okText: trsl('general.action.all-right'),
        okColor: 'green',
    },
    info: {
        icon: LightBulbIcon,
        iconColor: 'blue',
        okText: trsl('general.action.all-right'),
        okColor: 'blue',
    },
    warning: {
        icon: ExclamationIcon,
        iconColor: 'yellow',
        okText: trsl('general.action.proceed'),
        okColor: 'yellow',
    },
    error: {
        icon: ExclamationIcon,
        iconColor: 'red',
        okText: trsl('general.action.proceed'),
        okColor: 'red',
    },
    remove: {
        icon: TrashIcon,
        iconColor: 'red',
        okText: trsl('general.action.remove'),
        okColor: 'red',
    },
}
