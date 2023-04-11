// eslint-disable @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line vue/prefer-import-from-vue
import type { LooseRequired } from '@vue/shared'
import {
    defineComponent,
    reactive,
    toRef,
    type ComponentObjectPropsOptions,
    type ExtractPropTypes,
    type RenderFunction,
    type SetupContext,
    type ToRefs,
    type UnwrapNestedRefs,
} from 'vue'

type Data = Record<string, unknown>
export type Props<T = Data> = ComponentObjectPropsOptions<T>

/**
 * `ExtractedProps` maps a prop object to the props, which are received in the `setup` function of a components.
 */
export type ExtractedProps<T extends Props> = Readonly<LooseRequired<Readonly<ExtractPropTypes<T>>>>

/**
 * Components should be created using this helper function.
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
    setup: (props: ExtractedProps<T>, context: SetupContext<never[]>) => RenderFunction | Promise<RenderFunction>
) {
    return defineComponent({ name, props, emits: [], setup })
}

/**
 * Views should be created using this helper function. Views are special components, which don't have props.
 * They are often the parent objects in a view hierarchy and contain many components.
 * This function is syntactic sugar to create views and just calls {@link createComponent}.
 * @param name the name of the component, should be more than one word.
 * @param setup the setup function, which will be called when the component is mounted.
 * @returns the created vue-component.
 */
export function createView(
    name: string,
    setup: (context: SetupContext<never[]>) => RenderFunction | Promise<RenderFunction>
) {
    return defineComponent({ name, emits: [], setup: (props, context) => setup(context) })
}

/**
 * Extracts props from another prop object and returns a reactive object with the specified props.
 * @param props the props to extract from
 * @param keys the keys to extract from the props
 * @returns the new object with the specified props
 * @example
 * const parentProps = { title: 'hi', text: 'ho' }
 * const childProps = extractProps(parentProps, 'title')
 * console.log(childProps) // { title: 'hi' }
 */
export function extractProps<T extends Record<string, unknown>>(
    props: T,
    ...keys: (keyof T)[]
): UnwrapNestedRefs<Partial<ToRefs<T>>> {
    const partial: Partial<ToRefs<T>> = {}
    for (const key of keys) partial[key] = toRef(props, key)
    return reactive(partial)
}
