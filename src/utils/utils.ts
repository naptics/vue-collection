import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export type EmptyObject = Record<string, never>
export type HeroIcon = FunctionalComponent<HTMLAttributes & VNodeProps>

export type TWTextSize =
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
    | 'text-5xl'
    | 'text-6xl'
    | 'text-7xl'
    | 'text-8xl'
    | 'text-9xl'
