import { createComponent, createProps } from '@/utils/vue'
import { ref } from 'vue'
import NButton from './NButton'

export const helloWorldProps = createProps({
    message: {
        type: String,
        required: true,
    },
})

export default createComponent('HelloWorld', helloWorldProps, props => {
    const color = ref('green')
    setTimeout(() => (color.value = 'red'), 1000)

    return () => (
        <div class="greetings">
            <NButton color="primary" disabled={false}>
                Click me
            </NButton>
            <h1 class="green">Hello {props.message}</h1>
        </div>
    )
})
