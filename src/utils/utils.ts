import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export type EmptyObject = Record<string, never>
export type HeroIcon = FunctionalComponent<HTMLAttributes & VNodeProps>
