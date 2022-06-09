import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return () => (
            <div>
                <header>
                    <div class="wrapper">
                        <HelloWorld hello="test" />

                        <nav>
                            <RouterLink to="/">Home</RouterLink>
                        </nav>
                    </div>
                </header>
                <RouterView />
            </div>
        )
    },
})
