import type { LooseRequired } from '@vue/shared'
import {
    defineComponent,
    type ComponentPropsOptions,
    type ExtractPropTypes,
    type PropType,
    type RenderFunction,
    type SetupContext,
} from 'vue'

type Data = Record<string, unknown>

export function defineProps<T, U = DefineProps<T>>(props: U): U {
    return props
}

export type DefineProps<T = Data> = {
    [P in keyof Required<T>]: DefineProp<T[P]>
}

type DefineProp<T> = PropOptions<T> | (IsNullable<T> extends true ? PropType<NonNullable<T>> : never)

type PropOptions<T> = {
    type: PropType<NonNullable<T>>
    // eslint-disable-next-line @typescript-eslint/ban-types
} & (IsNullable<T> extends true ? DefaultValue<T> : RequiredValue)

type IsNullable<T> = null extends T ? true : undefined extends T ? true : false
type RequiredValue = { required: true }
type DefaultValue<T> = { default: T | (() => T) }

/**
 * Vue-Collection components should be created
 * @param props
 * @param setup
 * @returns
 */
export function createComponent<T extends ComponentPropsOptions>(
    props: T,
    setup: (
        props: Readonly<LooseRequired<Readonly<ExtractPropTypes<T>>>>,
        context: SetupContext<never[]>
    ) => RenderFunction
) {
    return defineComponent({ props, emits: [], setup })
}
