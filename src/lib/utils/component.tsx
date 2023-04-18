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
    type Slots,
    toRefs,
    ref,
} from 'vue'
import type { AnyObject } from './utils'

type Data = Record<string, unknown>
export type Props<T extends Data = Data> = ComponentObjectPropsOptions<T>

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
 * When using this function, the created component will make available all props
 * specifiedin `slotPropKeys` as slot. In this way, they can be used by either setting
 * the prop directly or by using a slot with the same name. This is useful for older
 * components (in `.vue` files), because they are dependent on slots.
 * @see {@link createComponent}
 */
export function createComponentWithSlots<T extends Props>(
    name: string,
    props: T,
    slotPropKeys: SlotPropsKeys<ExtractedProps<T>>,
    setup: (props: ExtractedProps<T>, context: SetupContext<never[]>) => RenderFunction | Promise<RenderFunction>
) {
    const newSetup: typeof setup = (props, context) => {
        const slottedProps = createSlotProps(props, context.slots, ...slotPropKeys)
        return setup(slottedProps, context)
    }
    return createComponent(name, props, newSetup)
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

/*
 * ---------- Slot Helpers ----------
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SlotFunction<Args extends any[] = any[]> = (...args: Args) => JSX.Element

/**
 * Filters object T to only have properties of type K.
 */
type FilterObject<T, K> = {
    [P in keyof T as T[P] extends K ? P : never]: T[P]
}

type SlotPropsKeys<T extends AnyObject> = (keyof FilterObject<T, SlotFunction | undefined>)[]

function createSlotProps<T extends AnyObject, U extends SlotPropsKeys<T>>(props: T, slots: Slots, ...keys: U): T {
    // create refs, don't touch all props which are not slots
    const newProps = toRefs(props)
    keys.forEach(key => {
        // if a slot is set once, it is basically always set. The changing content is not a problem as it is inside the function.
        const slot = slots[key as string]
        // if the slot is set, overwrite the props
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (slot) newProps[key] = ((...args: any) => <>{slot?.(...args)}</>) as any
    })
    return ref(newProps).value
}
