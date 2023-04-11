import { createComponent } from '@/lib/utils/component'
import { LinkIcon } from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'

export const componentSectionProps = {
    id: String,
    title: String,
    subtitle: String,
} as const

export default createComponent('ComponentSection', componentSectionProps, (props, { slots }) => {
    return () => (
        <div class="border-b-2 border-default-200" id={props.id}>
            <div>
                <div class="px-8 py-10 max-w-4xl mx-auto">
                    <RouterLink to={{ hash: props.id ? `#${props.id}` : undefined }} class="group outline-none">
                        <h2 class="font-bold text-4xl mb-2 flex items-center space-x-2 ">
                            <span>{props.title}</span>
                            <LinkIcon class="h-8 w-8 text-default-900 opacity-30 hidden group-hover:block group-focus-visible:block" />
                        </h2>
                    </RouterLink>
                    <p class="text-default-500 text-xl font-light">{props.subtitle}</p>
                </div>
            </div>
            <div class="bg-default-50">
                <div class="px-8 pt-10 pb-20 space-y-8 max-w-4xl mx-auto">{slots.default?.()}</div>
            </div>
        </div>
    )
})
