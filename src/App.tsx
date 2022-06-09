import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { defineComponent } from 'vue'
import './App.css'

export default defineComponent({
    setup() {
        return () => (
            <div>
                <header>
                    <div class="">
                        <HelloWorld message="Vue Collection" />
                    </div>
                </header>
                <RouterView />
            </div>
        )
    },
})
