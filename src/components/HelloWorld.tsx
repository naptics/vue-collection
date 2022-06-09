import Test from './Test'
import { ref, type ComponentObjectPropsOptions, type ComponentPropsOptions, type PropType } from 'vue'
import { computed } from '@vue/reactivity'
import { createComponent, defineProps, type DefineProps } from '@/vue'

export type HelloWorldProps = {
    hello?: string
}

const helloWorldProps: DefineProps<HelloWorldProps> = {
    hello: {
        type: String,
        default: () => '',
    },
}

export default createComponent(helloWorldProps, props => {
    const hello = computed(() => props.hello)

    return () => (
        <div class="greetings">
            <h1 class="green">hello {hello.value}</h1>
            <h3>
                <Test {...props} />
            </h3>
        </div>
    )
})
