import NDropzone from '@/components/base/NDropzone'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { createView } from '@/utils/vue-collection/component'
import { ref } from 'vue'
import { vModelForRef } from '@/utils/vue-collection/vModel'

export default createView('DropzoneView', () => {
    const fileRefs = Array.from({ length: 5 }).map(() => ref<File[]>([]))

    return () => (
        <ComponentSection
            title="Dropzones"
            subtitle="Dropzones are a simple way for the user to provide files to the application."
            id="dropzones"
        >
            <VariantSection title="Basic" subtitle="Files can be added by clicking on the area or by dropping them.">
                <NDropzone {...vModelForRef(fileRefs[0])} maxLengthFileNames={50} />
            </VariantSection>

            <VariantSection title="Multiple files">
                <NDropzone {...vModelForRef(fileRefs[1])} maxFiles={10} />
            </VariantSection>

            <VariantSection
                title="File Type and Size"
                subtitle="The allowed file types and their maximum size can be specified."
            >
                <NDropzone
                    {...vModelForRef(fileRefs[2])}
                    maxFiles={5}
                    accept="image/*, .pdf, .zip"
                    maxFileSize={5 * 1024 * 1024}
                    description="Files of type .pdf or .zip and all image files with a max size of 5 MB are allowed."
                />
            </VariantSection>
        </ComponentSection>
    )
})
