import { createComponent, type ExtractedProps } from '../utils/component'
import { uniqueId } from '../utils/utils'
import type { TWMaxWidth } from '../utils/tailwind'
import { computed, onMounted, ref, watch, type PropType, onUnmounted, Transition } from 'vue'
import { createPopper, type Instance as PopperInstance } from '@popperjs/core'
import { watchRef } from '../utils/vue'
import './NTooltip.css'

export const nTooltipProps = {
    /**
     * The text content of the tooltip.
     */
    text: String,
    /**
     * A slot to replace the content of the tooltip. This will override the `text` prop.
     */
    content: Function as PropType<() => JSX.Element>,
    /**
     * If set to `true` the tooltip is shown constantly.
     */
    show: Boolean,
    /**
     * If set to `true` the tooltip is hidden constantly.
     */
    hide: Boolean,
    /**
     * If set to `true` the `block` class is applied to the tooltip.
     * This should be set if the content in the default slot is also block.
     */
    block: Boolean,
    /**
     * The placement of the tooltip.
     */
    placement: {
        type: String as PropType<TooltipPlacement>,
        default: 'auto',
    },
    /**
     * The maximum width of the tooltip.
     */
    maxWidth: {
        type: String as PropType<TWMaxWidth>,
        default: 'max-w-xs',
    },
    /**
     * Adds the classes to the (invisible) wrapper element.
     */
    wrapperClass: String,
    /**
     * Adds the classes to the container of the tooltips content.
     */
    contentClass: String,
    /**
     * Adds the classes to the tooltip arrow. Make sure to use `before:` classes
     * to target the arrow (which is the before element).
     */
    arrowClass: String,
} as const

/**
 * These props are made to use on a component which implements the tooltip
 * and wants it to be controllable via the own props.
 * e.g. `text` is now called `tooltipText`.
 * They can be mapped to the normal tooltip props with {@link mapTooltipProps}
 */
export const nToolTipPropsForImplementor = {
    /**
     * Adds a tooltip to the component with the specified text.
     * @see {@link nTooltipProps.text}
     */
    tooltipText: nTooltipProps.text,
    /**
     * A slot for the tooltip of this component.
     * If the slot is set, the tooltip with the specified content is added to the component.
     * @see {@link nTooltipProps.content}
     */
    tooltipContent: nTooltipProps.content,
    /**
     * @see {@link nTooltipProps.hide}
     */
    tooltipHide: nTooltipProps.hide,
    /**
     * @see {@link nTooltipProps.show}
     */
    tooltipShow: nTooltipProps.show,
    /**
     * @see {@link nTooltipProps.placement}
     */
    tooltipPlacement: nTooltipProps.placement,
    /**
     * @see {@link nTooltipProps.maxWidth}
     */
    tooltipMaxWidth: nTooltipProps.maxWidth,
    /**
     * @see {@link nTooltipProps.wrapperClass}
     */
    tooltipWrapperClass: nTooltipProps.wrapperClass,
    /**
     * @see {@link nTooltipProps.contentClass}
     */
    tooltipContentClass: nTooltipProps.contentClass,
    /**
     * @see {@link nTooltipProps.arrowClass}
     */
    tooltipArrowClass: nTooltipProps.arrowClass,
}

/**
 * Maps the {@link nToolTipPropsForImplementor} props to normal tooltip props
 * @returns an object containing the normal tooltip props.
 */
export function mapTooltipProps(props: ExtractedProps<typeof nToolTipPropsForImplementor>) {
    return {
        text: props.tooltipText,
        content: props.tooltipContent,
        hide: props.tooltipHide,
        show: props.tooltipShow,
        placement: props.tooltipPlacement,
        maxWidth: props.tooltipMaxWidth,
        wrapperClass: props.tooltipWrapperClass,
        contentClass: props.tooltipContentClass,
        arrowClass: props.tooltipArrowClass,
    }
}

/**
 * The `NTooltip` is a wrapper for any component which adds a tooltip to it.
 * Any component can just be passed in the default slot and a tooltip will be added to it.
 * Note that this component disappears when neither the `text` nor the `content`
 * prop is passed as the tooltip would then be empty.
 * If this is the case, the default slot will just be rendered inside a div.
 * @example
 * <NTooltip text="Hello">
 *      <NButton />
 * </NTooltip>
 */
const Component = createComponent('NTooltip', nTooltipProps, (props, { slots }) => {
    return () => (
        <div class={[props.block ? 'block' : 'inline-block', props.wrapperClass]}>
            {props.content || props.text ? (
                <NTooltipBase {...props}>{slots.default?.()}</NTooltipBase>
            ) : (
                slots.default?.()
            )}
        </div>
    )
})

export { Component as NTooltip, Component as default }

const NTooltipBase = createComponent('NTooltipBase', nTooltipProps, (props, { slots }) => {
    let popperInstance: PopperInstance | null = null
    const contentId = `content-${uniqueId()}`
    const tooltipId = `tooltip-${uniqueId()}`

    function createTooltip() {
        const content = document.getElementById(contentId)
        const tooltip = document.getElementById(tooltipId)
        if (content && tooltip) {
            popperInstance = createPopper(content, tooltip, {
                placement: props.placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                ],
            })
        } else {
            console.error('Could not create tooltip. HTML elements for content or tooltip were not found.')
        }
    }

    function destroyTooltip() {
        popperInstance?.destroy()
        popperInstance = null
    }

    onMounted(createTooltip)
    onUnmounted(destroyTooltip)

    watch(
        () => props.placement,
        newPlacement => popperInstance?.setOptions({ placement: newPlacement })
    )

    const isHoveringContent = ref(false)
    const isHoveringTooltip = ref(false)
    const isHovering = computed(() => isHoveringContent.value || isHoveringTooltip.value)
    const showTooltip = computed(() => props.show || (!props.hide && isHovering.value))

    watchRef(showTooltip, () => popperInstance?.update())

    return () => (
        <>
            <div
                class="p-[10px] -m-[10px]"
                onMouseleave={() => setTimeout(() => (isHoveringContent.value = false), 10)}
            >
                <div id={contentId} onMouseenter={() => (isHoveringContent.value = true)}>
                    {slots.default?.()}
                </div>
            </div>

            <Transition
                enterActiveClass="transition-opacity ease-out duration-100"
                enterFromClass="opacity-0"
                enterToClass="opacity-100"
                leaveActiveClass="transition-opacity ease-in duration-75"
                leaveFromClass="opacity-100"
                leaveToClass="opacity-0"
            >
                <div
                    id={tooltipId}
                    role="tooltip"
                    onMouseenter={() => (isHoveringTooltip.value = true)}
                    onMouseleave={() => (isHoveringTooltip.value = false)}
                    v-show={showTooltip.value}
                    class={[isHovering.value ? 'z-20' : 'z-10', props.maxWidth, 'tooltip']}
                >
                    <div
                        class={`bg-white rounded-md py-2 px-4 shadow-lg border-default-200 border text-sm whitespace-normal font-normal text-default-700 ${props.contentClass}`}
                    >
                        {props.content?.() || props.text}
                    </div>
                    <div data-popper-arrow class={`arrow ${props.arrowClass}`} />
                </div>
            </Transition>
        </>
    )
})

export type TooltipPlacement =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end'
