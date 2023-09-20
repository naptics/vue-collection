import { trslc } from '../i18n'
import { createComponent } from '../utils/component'
import { maxLengthSplitCenter } from '../utils/stringMaxLength'
import { notNullish } from '../utils/utils'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { computed, ref } from 'vue'
import NBadge from './NBadge'
import NIconButton from './NIconButton'
import NLink from './NLink'
import { vModelProps } from '../utils/vModel'

export const nDropzoneProps = {
    ...vModelProps<File[]>(Array),
    /**
     * A description which files are allowed for this dropzone.
     * This should include everything the user needs to know about
     * the file type / the extensions and the maximum size of the file.
     * @see {@link nDropzoneProps.accept}
     * @see {@link nDropzoneProps.maxFileSize}
     */
    description: String,
    /**
     * The maximum amount of files which can be added to the dropzone.
     */
    maxFiles: {
        type: Number,
        default: 1,
    },
    /**
     * Specifies which file types are accepted. The same syntax as with inputs of type file is used.
     * Make sure to explain the requirements to the user in the {@link nDropzoneProps.description}.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
     */
    accept: String,
    /**
     * Specifies the maximum size of an individual file in bytes.
     * Make sure to explain the max size to the user in the {@link nDropzoneProps.description}.
     */
    maxFileSize: {
        type: Number,
        default: 100 * 1024 * 1024,
    },
    /**
     * The maximum length of the file names.
     * Files names longer than the specified amount of characters will be shortened.
     * @see {@link maxLengthSplitCenter}
     */
    maxLengthFileNames: {
        type: Number,
        default: 35,
    },
    /**
     * A tailwind height class, which is applied to the dropzone area.
     * It is recommended to use `min-h-*` classes,
     * so the box is always large enough to display it's text.
     */
    height: {
        type: String,
        default: 'min-h-36',
    },
    /**
     * If set to `true`, the dropzone is disabled and does not accept input anymore.
     */
    disabled: Boolean,
} as const

/**
 * The `NDropzone` is an area where files can be added by the user by drag & drop.
 * Files can also be selected with a file chooser by clicking on the dropzone.
 */
const Component = createComponent('NDropzone', nDropzoneProps, props => {
    const fileError = ref<string>()

    const filterAndUpdateFiles = (files: File[]) => {
        // filter for mime type and max size
        const fileTypeFilteredFiles = files.filter(
            file => !props.accept || testFileWithAcceptString(props.accept, file)
        )
        const filteredFiles = fileTypeFilteredFiles.filter(file => file.size <= props.maxFileSize)

        // filter for already existing files
        const currentFiles = props.value || []
        filteredFiles.forEach(file => {
            if (currentFiles.filter(currFile => currFile.name == file.name).length == 0) currentFiles.push(file)
        })

        // slice down to max amount of files
        const newFiles = currentFiles.slice(0, props.maxFiles)

        // error handling
        const fileTypeFilterDiff = files.length - fileTypeFilteredFiles.length
        const fileSizeFilterDiff = fileTypeFilteredFiles.length - filteredFiles.length
        if (newFiles.length < currentFiles.length)
            fileError.value = trslc('vue-collection.error.too-many-files', props.maxFiles, { max: props.maxFiles })
        else if (fileSizeFilterDiff > 0) {
            fileError.value = trslc('vue-collection.error.file-size', fileSizeFilterDiff, { n: fileSizeFilterDiff })
        } else if (fileTypeFilterDiff > 0)
            fileError.value = trslc('vue-collection.error.file-type', fileTypeFilterDiff, { n: fileTypeFilterDiff })
        else fileError.value = undefined

        // update new value
        props.onUpdateValue?.(newFiles)
    }

    const files = computed(
        () =>
            props.value?.map((file, index) => ({
                index,
                name: maxLengthSplitCenter(file.name, props.maxLengthFileNames),
            })) || []
    )

    const removeFile = (index: number) => {
        const newFiles = [...(props.value || [])]
        newFiles.splice(index, 1)
        fileError.value = undefined
        props.onUpdateValue?.(newFiles)
    }

    const clearFiles = () => {
        fileError.value = undefined
        props.onUpdateValue?.([])
    }

    const isDragOver = ref(false)

    const onDrop = (event: DragEvent) => {
        event.preventDefault()
        isDragOver.value = false

        if (props.disabled) return
        const transfer = event.dataTransfer
        if (transfer == null) return

        if (transfer.items.length > 0) {
            const items = [...transfer.items]
            const files = items.map(item => (item.kind === 'file' ? item.getAsFile() : null)).filter(notNullish)
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
        if (input != null) {
            if (input.files != null) filterAndUpdateFiles([...input.files])
            input.value = ''
        }
    }

    return () => (
        <div>
            <button
                class={[
                    'block w-full rounded-md border-dashed border-2  focus-visible:border-primary-500 focus:outline-none ',
                    'flex flex-col items-center justify-center text-center text-sm select-none p-4',
                    !props.disabled ? 'hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700' : '',
                    props.disabled
                        ? 'border-default-300 bg-default-50/50 text-default-500/30'
                        : isDragOver.value
                        ? 'border-primary-300 bg-primary-50 text-primary-700'
                        : 'border-default-300 bg-default-50 text-default-500',
                    props.height,
                ]}
                onDrop={onDrop}
                onDragover={onDragOver}
                onDragleave={onDragLeave}
                onClick={onClick}
                type="button"
                disabled={props.disabled}
            >
                <input
                    type="file"
                    class="hidden"
                    ref={fileInput}
                    multiple={props.maxFiles > 1}
                    accept={props.accept}
                    onChange={onInputFilesChanged}
                    onClick={event => event.stopPropagation()}
                />

                {/* Counterweight */}
                <div class="flex-grow mb-2" />

                <span class="font-medium">
                    {trslc('vue-collection.text.drag-n-drop-files', props.maxFiles, { n: props.maxFiles })}
                </span>
                <span>{props.description}</span>

                <div class="flex-grow mt-2 flex items-end justify-center text-red-500 font-medium">
                    <span>{fileError.value}</span>
                </div>
            </button>

            <div class="mt-2 space-y-1">
                <div class="flex flex-wrap gap-2 ">
                    {files.value.map(file => (
                        <NBadge key={file.index} color="default" allCaps={false} textSize="text-xs">
                            <div class="flex items-center space-x-2">
                                <span>{file.name}</span>
                                <NIconButton
                                    icon={XMarkIcon}
                                    shade={900}
                                    size={3}
                                    onClick={() => removeFile(file.index)}
                                />
                            </div>
                        </NBadge>
                    ))}

                    <div class="flex-grow text-sm text-default-500 flex items-end justify-end text-right">
                        <span>
                            <span>
                                {trslc('vue-collection.text.files-selected', files.value.length, {
                                    n: files.value.length,
                                })}
                            </span>
                            {files.value.length > 0 && (
                                <>
                                    <span> </span>
                                    <NLink color="default" onClick={clearFiles}>
                                        {trslc('vue-collection.action.clear-files', files.value.length)}
                                    </NLink>
                                </>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export { Component as NDropzone, Component as default }

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
const MIME_FORMAT = /^(image|audio|application|video|text)\/\*$/
const EXTENSION_FORMAT = /^\.\w{2,20}$/
function testFileWithAcceptString(accept: string, file: File): boolean {
    const splitted = accept.split(',').map(pattern => pattern.trim())
    for (const pattern of splitted) {
        if (MIME_FORMAT.test(pattern)) {
            if (RegExp(`^${pattern.substring(0, pattern.length - 2)}\\/.{2,}$`).test(file.type)) return true
        } else if (EXTENSION_FORMAT.test(pattern)) {
            if (RegExp(`^.*${pattern}$`).test(file.name)) return true
        }
    }
    return false
}
