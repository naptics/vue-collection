import { defineComponent } from 'vue'
import './App.css'
import NButton from './components/base/NButton'

export default defineComponent({
    setup() {
        return () => (
            <div>
                <div class="space-x-8">
                    <NButton>Hello</NButton>
                </div>
            </div>
        )
    },
})
