import type { VNode } from 'vue'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [elem: string]: any
        }
        type Element = VNode
    }
}

export {}
