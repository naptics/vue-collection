import NDropzone from '@/components/base/NDropzone'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView, refAsVModel } from '@/utils/component'
import { ref } from 'vue'

export default createView('DropzoneView', () => {
    const files = ref<File[]>([])

    return () => (
        <ComponentSection title="Dropzone" id="dropzone">
            <VariantSection title="Normal">
                <NDropzone {...refAsVModel(files)} />
            </VariantSection>
        </ComponentSection>
    )
})
