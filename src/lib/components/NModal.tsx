import { createComponent } from '../utils/component'
import type { PropType } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import NButton from './NButton'
import NIconButton from './NIconButton'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { trsl } from '../i18n'
import type { TWMaxWidth } from '../utils/tailwind'
import { vModelProps } from '../utils/vModel'

export const nModalProps = {
    ...vModelProps(Boolean),
    /**
     * If set to `true` the header of the modal is hidden.
     */
    hideHeader: Boolean,
    /**
     * If set to `true` the footer of the modal is hidden.
     */
    hideFooter: Boolean,
    /**
     * If set to `true` the X-button in the top right is hidden.
     */
    hideX: Boolean,
    /**
     * The maximum width of the modal. A regular tailwind class.
     */
    maxWidth: {
        type: String as PropType<TWMaxWidth>,
        default: 'max-w-md',
    },
    /**
     * The title of the modal which is displayed in the header.
     */
    title: String,
    /**
     * The text of the ok-button.
     */
    okText: {
        type: String,
        default: trsl('vue-collection.action.save'),
    },
    /**
     * The color of the ok-button.
     */
    okColor: {
        type: String,
        default: 'primary',
    },
    /**
     * If set to `true` the modal is closed when `onOk` is called.
     */
    closeOnOk: {
        type: Boolean,
        default: true,
    },
    /**
     * If set to `true` the ok-button is hidden.
     */
    hideOk: Boolean,
    /**
     * If set to `true` the ok-button is disabled.
     */
    okDisabled: Boolean,
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
     * If set to `true`, the modal is closed when clicking on the background.
     * This will call `onCancel`. Default is `true`.
     */
    closeOnBackground: {
        type: Boolean,
        default: true,
    },
    /**
     * If set to `true` the cancel-button is hidden.
     */
    hideCancel: Boolean,
    /**
     * This is called when the ok-button was clicked.
     */
    onOk: Function as PropType<() => void>,
    /**
     * This is called when the cancel-button or X-button was clicked or
     * if the modal was closed by clicking on the background.
     */
    onCancel: Function as PropType<() => void>,
    /**
     * A slot to replace the whole modal content including all buttons, header and footer.
     */
    modal: Function as PropType<(props: ModalSlotProps) => JSX.Element>,
    /**
     * A slot to replace the whole header section (excluding the x).
     */
    header: Function as PropType<() => JSX.Element>,
    /**
     * A slot to replace the whole footer section.
     */
    footer: Function as PropType<(props: ModalSlotProps) => JSX.Element>,
} as const

export type ModalSlotProps = { ok: () => void; cancel: () => void }

/**
 * The `NModal` is the base component for all modals and dialogs.
 * It provides the core mechanics to display a window in front of everything else.
 */
export default createComponent('NModal', nModalProps, (props, { slots }) => {
    const ok = () => {
        props.onOk?.()
        if (props.closeOnOk) props.onUpdateValue?.(false)
    }

    const cancel = () => {
        props.onCancel?.()
        props.onUpdateValue?.(false)
    }

    return () => (
        <TransitionRoot as="template" show={props.value}>
            <Dialog as="div" static class="fixed z-40 inset-0 overflow-y-auto" onClose={cancel} open={props.value}>
                <div class="flex items-center justify-center min-h-screen">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        {props.closeOnBackground ? (
                            <DialogOverlay class="fixed inset-0 bg-default-700 bg-opacity-75" />
                        ) : (
                            <div class="fixed inset-0 bg-default-700 bg-opacity-75" />
                        )}
                    </TransitionChild>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span class="hidden align-middle h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div class={['transform m-4 w-full align-middle', props.maxWidth]}>
                            {props.modal?.({ ok, cancel }) || (
                                <div
                                    class={[
                                        'shadow-xl rounded-lg bg-white divide-y divide-default-100',
                                        props.maxWidth,
                                    ]}
                                >
                                    {!props.hideX && (
                                        <div class="sm:block absolute top-0 right-0 mt-3 mr-3">
                                            <NIconButton icon={XMarkIcon} color="default" size={5} onClick={cancel} />
                                        </div>
                                    )}

                                    {!props.hideHeader && (
                                        <div class="px-4 sm:px-6 pt-4 pb-2 bg-default-50 rounded-t-lg">
                                            {props.header?.() || (
                                                <DialogTitle as="h4" class="text-lg font-semibold">
                                                    {props.title}
                                                </DialogTitle>
                                            )}
                                        </div>
                                    )}

                                    <div class="px-4 sm:px-6 py-4 rounded-lg">{slots.default?.()}</div>

                                    {!props.hideFooter && (
                                        <div class="px-4 sm:px-6 pb-4 pt-2 bg-default-50 rounded-b-lg">
                                            {props.footer?.({ ok, cancel }) || (
                                                <div class="flex justify-end space-x-2">
                                                    {!props.hideCancel && (
                                                        <NButton color={props.cancelColor} onClick={cancel}>
                                                            {props.cancelText}
                                                        </NButton>
                                                    )}
                                                    {!props.hideOk && (
                                                        <NButton
                                                            color={props.okColor}
                                                            onClick={ok}
                                                            disabled={props.okDisabled}
                                                        >
                                                            {props.okText}
                                                        </NButton>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    )
})
