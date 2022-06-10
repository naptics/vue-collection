import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import './App.css'
import NButton from './components/base/NButton'

export default defineComponent({
    setup() {
        return () => (
            <div>
                <header>
                    <div class="">
                        <NButton>Hello</NButton>
                    </div>
                </header>
                <RouterView />
            </div>
        )
    },
})
