import { createComponent, createProps, type ExtractedProps } from '@/utils/component'
import type { PropType } from 'vue'
import Popper from 'vue3-popper'

export const nTooltipProps = createProps({
    /**
     * The text content of the tooltip.
     */
    text: String,
    /**
     * A slot to replace the content of the tooltip. This will override the `text` prop.
     */
    content: Function as PropType<() => void>,
    /**
     * If set to `true` the tooltip will not render itself but only it's default slot.
     * This results in the same output as if the tooltip would not exist at all.
     * The property can be used to remove the tooltip conditionally, if it is only available in some states.
     * Note that the tooltip automatically implodes when neither `text` nor `content` is set.
     */
    implode: Boolean,
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
     * If set to `true` the tooltip will show when hovering the content in the default slot.
     * Otherwise it will only show on click of the default slot.
     */
    hover: {
        type: Boolean,
        default: true,
    },
})

/**
 * These props are made to use on a component which implements the tooltip
 * and wants it to be controllable via the own props.
 * e.g. `text` is now called `tooltipText`.
 * They can be mapped to the normal tooltip props with {@link mapTooltipProps}
 *
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
     * @see {@link nTooltipProps.hover}
     */
    tooltipHover: nTooltipProps.hover,
}

/**
 * Maps the {@link nToolTipPropsForImplementor} props to normal tooltip props
 * @returns an object containing the normal tooltip props.
 */
export function mapTooltipProps(props: ExtractedProps<typeof nToolTipPropsForImplementor>) {
    return {
        text: props.tooltipText,
        content: props.tooltipContent,
        implode: props.tooltipHide,
        show: props.tooltipShow,
        placement: props.tooltipPlacement,
        hover: props.tooltipHover,
    }
}

/**
 * The `NTooltip` is a wrapper for any component which adds a tooltip to it.
 * Any component can just be passed in the default slot and a tooltip will be added to it.
 * Note that this component completely disappears when neither the `text` nor the `content` prop is passed
 * as the tooltip would then be empty. This behaviour can also be achieved by setting the `implode` prop.
 * @example
 * <NTooltip content="Hello">
 *      <NButton />
 * </NTooltip>
 */
export default createComponent('NTooltip', nTooltipProps, (props, { slots }) => {
    return () =>
        !props.implode && (props.text || props.content) ? (
            <Popper
                show={props.show ? true : props.hide ? false : undefined}
                hover={props.hover}
                placement={props.placement}
                class={props.block ? '!block' : ''}
            >
                {{
                    default: () => slots.default?.(),
                    content: () => (
                        <div class="max-w-sm bg-white rounded-md py-2 px-4 shadow-lg border-default-200 border text-sm text-default-700">
                            {props.content?.() || props.text}
                        </div>
                    ),
                }}
            </Popper>
        ) : (
            slots.default?.()
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
