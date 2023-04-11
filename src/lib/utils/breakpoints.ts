import { computed, ref, type ComputedRef } from 'vue'

export type TWBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const breakpoints: Readonly<Record<TWBreakpoint, number>> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
}

export const bodyWidth = ref(document.body.clientWidth)

/**
 * This function has to be called once in the app two ensure that the breakpoint utilities actually update.
 * It sets a `window.onresize` listener.
 */
export function addDocumentResizeEventListener(): void {
    window.onresize = () => {
        bodyWidth.value = document.body.clientWidth
    }
}

/**
 * Returns a ref whose value is `true` as long as the `document.body.clientWitdh` is above the specified breakpoint.
 */
export function isWidthBreakpoint(breakpoint: TWBreakpoint): ComputedRef<boolean> {
    switch (breakpoint) {
        case 'sm':
            return isWidthSm
        case 'md':
            return isWidthMd
        case 'lg':
            return isWidthLg
        case 'xl':
            return isWidthXl
        case '2xl':
            return isWidth2xl
    }
}

export const isWidth2xl = computed(() => bodyWidth.value > breakpoints['2xl'])
export const isWidthXl = computed(() => bodyWidth.value > breakpoints.xl)
export const isWidthLg = computed(() => bodyWidth.value > breakpoints.lg)
export const isWidthMd = computed(() => bodyWidth.value > breakpoints.md)
export const isWidthSm = computed(() => bodyWidth.value > breakpoints.sm)
