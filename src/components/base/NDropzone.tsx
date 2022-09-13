import { trslc } from '@/i18n'
import { createComponent, createProps, vModel } from '@/utils/component'
import { maxLengthSplitCenter } from '@/utils/format'
import { notNull } from '@/utils/utils'
import { computed, ref } from 'vue'

export const nDropzoneProps = createProps({
    ...vModel<File[]>(Array),
    multiple: Boolean,
    accept: String,
})

const FILE_NAME_MAX_LENGTH = 30

export default createComponent('NDropzone', nDropzoneProps, props => {
    const filterAndUpdateFiles = (files: (File | null | undefined)[]) => {
        const allowedMimeTypesRegex = props.accept ? parseAcceptStringToRegex(props.accept) : null
        const filteredFiles = files
            .filter(notNull)
            .filter(file => !allowedMimeTypesRegex || allowedMimeTypesRegex.test(file.type))
        const correctAmount = props.multiple || filteredFiles.length == 0 ? filteredFiles : [filteredFiles[0]]
        props.onUpdateValue?.(correctAmount)
    }

    const fileNames = computed(
        () => props.value?.map(file => maxLengthSplitCenter(file.name, FILE_NAME_MAX_LENGTH)) || []
    )

    const isDragOver = ref(false)

    const onDrop = (event: DragEvent) => {
        event.preventDefault()
        isDragOver.value = false

        const transfer = event.dataTransfer
        if (transfer == null) return

        if (transfer.items.length > 0) {
            const items = [...transfer.items]
            const files = items.map(item => (item.kind === 'file' ? item.getAsFile() : null))
            filterAndUpdateFiles(files)
        } else {
            filterAndUpdateFiles([...transfer.files])
        }
    }

    const onDragOver = (event: DragEvent) => {
        event.preventDefault()
        isDragOver.value = true
    }

    const onDragLeave = () => {
        isDragOver.value = false
    }

    const onClick = () => {
        fileInput.value?.click()
    }

    const fileInput = ref<HTMLInputElement>()

    const onInputFilesChanged = () => {
        const input = fileInput.value
        if (input && input.files) props.onUpdateValue?.([...input.files])
    }

    return () => (
        <div
            class={[
                'h-32 border-dashed border-2 rounded-md hover:border-primary-300 hover:bg-primary-50 cursor-pointer',
                isDragOver.value
                    ? 'border-primary-300 bg-primary-50 text-primary-700'
                    : 'border-default-300 bg-default-50 text-default-500',
                'flex flex-col items-center justify-center text-xs hover:text-primary-700 p-4',
            ]}
            onDrop={onDrop}
            onDragover={onDragOver}
            onDragleave={onDragLeave}
            onClick={onClick}
        >
            <input
                type="file"
                class="hidden"
                ref={fileInput}
                multiple={props.multiple}
                accept={props.accept}
                onChange={onInputFilesChanged}
                onClick={event => event.stopPropagation()}
            />
            <div>
                <span class="font-medium">
                    {trslc('general.text.drag-n-drop-files', fileNames.value.length, { n: fileNames.value.length })}
                </span>
                <ul>
                    {fileNames.value.map(fileName => (
                        <li key={fileName}>{`- ${fileName}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
})

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
const MIME_FORMAT = /^(image|audio|application|video|text)\/\*$/
const EXTENSION_FORMAT = /^\.\w{2,20}$/
function parseAcceptStringToRegex(accept: string): RegExp {
    const splitted = accept.split(',').map(pattern => pattern.trim())

    const regex = splitted
        .map(pattern => {
            if (MIME_FORMAT.test(pattern)) return `${pattern.substring(0, pattern.length - 2)}\\/\\w{2,20}`
            else if (EXTENSION_FORMAT.test(pattern)) return `\\w{2,20}\\/${pattern.substring(1)}`
            return null
        })
        .filter(notNull)
        .map(pattern => `(^${pattern}$)`)
        .join('|')

    return RegExp(regex)
}
