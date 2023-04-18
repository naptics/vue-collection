import type { HeroIcon } from '../utils/tailwind'
import { createComponent } from '../utils/component'
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { computed, type PropType } from 'vue'
import NIconButton from './NIconButton'
import NLoadingIndicator from './NLoadingIndicator'

export type AlertVariant = 'success' | 'info' | 'warning' | 'error' | 'loading'

export const nAlertProps = {
    /**
     * The variant of the alert. This defines its color and icon.
     */
    variant: {
        type: String as PropType<AlertVariant>,
        default: 'success',
    },
    /**
     * The text of the alert.
     */
    text: String,
    /**
     * If set to `true` the X-button of the alert is hidden.
     */
    hideX: Boolean,
    /**
     * Adds the classes to the top-level element.
     */
    addClass: String,
    /**
     * This is called, when the X-button is clicked.
     */
    onDismiss: Function as PropType<() => void>,
} as const

/**
 * The `NAlert` is a fully styled alert with multiple variants.
 * It can be used as a normal blocking element or as part of an alert queue.
 */
export default createComponent('NAlert', nAlertProps, (props, { slots }) => {
    const variant = computed(() => VARIANTS[props.variant])

    return () => (
        <div class={`rounded-md p-3 shadow-lg bg-${variant.value.color}-50 ${props.addClass}`}>
            <div class="flex items-center">
                <div class="flex flex-shrink-0 items-center">{variant.value.icon()}</div>

                <div class="ml-3 flex-grow">
                    <p class={`text-sm font-medium text-${variant.value.color}-900`}>
                        {slots.default?.() ?? props.text}
                    </p>
                </div>

                {!props.hideX && (
                    <div class="flex items-center flex-shrink-0 ml-3">
                        <NIconButton color={variant.value.color} size={5} icon={XMarkIcon} onClick={props.onDismiss} />
                    </div>
                )}
            </div>
        </div>
    )
})

const icon = (icon: HeroIcon, color: string) => () => <icon class={`h-5 w-5 text-${color}-500`} />

const VARIANTS = {
    success: {
        icon: icon(CheckCircleIcon, 'green'),
        color: 'green',
    },
    info: {
        icon: icon(InformationCircleIcon, 'blue'),
        color: 'blue',
    },
    warning: {
        icon: icon(ExclamationCircleIcon, 'yellow'),
        color: 'yellow',
    },
    error: {
        icon: icon(ExclamationCircleIcon, 'red'),
        color: 'red',
    },
    loading: {
        icon: () => <NLoadingIndicator color="blue" size={7} shade={500} />,
        color: 'blue',
    },
}
