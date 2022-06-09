import type { LooseRequired } from '@vue/shared'
import {
    defineComponent,
    type ComponentObjectPropsOptions,
    type ExtractPropTypes,
    type RenderFunction,
    type SetupContext,
} from 'vue'

type Data = Record<string, unknown>
export type Props<T = Data> = ComponentObjectPropsOptions<T>

/**
 * Vue Collection components should be created using this helper function.
 * It only takes three arguments, the name and the props of the component and the setup function.
 * All other arguments which the {@link defineComponent} method of vue may provide,
 * should not be used for a better consistency across all components.
 * @param name the name of the component, should be more than one word.
 * @param props the props of the component.
 * @param setup the setup function, which will be called when the component is mounted.
 * @returns the created vue-component.
 */
export function createComponent<T extends Props>(
    name: string,
    props: T,
    setup: (
        props: Readonly<LooseRequired<Readonly<ExtractPropTypes<T>>>>,
        context: SetupContext<never[]>
    ) => RenderFunction
) {
    return defineComponent({ name, props, emits: [], setup })
}

/**
 * If props are specified outside of the {@link createComponent} function - e.g.
 * to export them or for better code style -
 * this helper function can be used to ensure strict type-checking.
 * @param props the props which should be created.
 * @returns the created props, with correct type-checking
 */
export function createProps<T extends Props>(props: T): T {
    return props
}
