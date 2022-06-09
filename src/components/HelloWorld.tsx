import { computed } from '@vue/reactivity'
import { createComponent, createProps } from '@/vue'

export const helloWorldProps = createProps({
    message: {
        type: String,
        required: true,
    },
})

export default createComponent('HelloWorld', helloWorldProps, props => {
    return () => (
        <div class="greetings">
            <h1 class="green">Hello {props.message}</h1>
        </div>
    )
})
