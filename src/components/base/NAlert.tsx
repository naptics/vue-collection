import type { HeroIcon } from '@/utils/utils'
import { createComponent, createProps } from '@/utils/component'
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XIcon } from '@heroicons/vue/solid'
import { computed, type PropType } from 'vue'
import NIconButton from './NIconButton'
import NLoadingIndicator from './NLoadingIndicator'

export type AlertVariant = 'success' | 'info' | 'warning' | 'error' | 'loading'

export const nAlertProps = createProps({
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
     * This is called, when the X-button is clicked.
     */
    onDismiss: Function as PropType<() => void>,
})

/**
 * The `NAlert` is a fully styled alert with multiple variants.
 * It can be used as a normal blocking element or as part of an alert queue.
 */
export default createComponent('NAlert', nAlertProps, props => {
    const variant = computed(() => VARIANTS[props.variant])

    return () => (
        <div class={`rounded-md p-3 shadow-lg bg-${variant.value.color}-50`}>
            <div class="flex items-center">
                <div class="flex flex-shrink-0 items-center">{variant.value.icon()}</div>

                <div class="ml-3 flex-grow">
                    <p class={`text-sm font-medium text-${variant.value.color}-900`}>{props.text}</p>
                </div>

                {!props.hideX && (
                    <div class="flex items-center flex-shrink-0 ml-3">
                        <NIconButton color={variant.value.color} size={5} icon={XIcon} onClick={props.onDismiss} />
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
