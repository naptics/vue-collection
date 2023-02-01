import NButton from '@/components/base/NButton'
import NForm from '@/components/base/NForm'
import NInput from '@/components/base/NInput'
import NSelect from '@/components/base/NSelect'
import NValInput from '@/components/base/NValInput'
import { createValidatedForm } from '@/components/base/ValidatedForm'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { email, matches, password, regex, integer, numberRange, length } from '@/utils/vue-collection/validation'
import { createView } from '@/utils/vue-collection/component'
import { ref } from 'vue'
import NInputSelect from '@/components/base/NInputSelect'
import NInputSuggestion from '@/components/base/NInputSuggestion'
import NInputPhone from '@/components/base/NInputPhone'
import { refAsVModel } from '@/utils/vue-collection/vModel'
import NTextArea from '@/components/base/NTextArea'

export default createView('InputView', () => {
    const suggestions = [
        { id: '1', label: 'Heidi Klum' },
        { id: '2', label: 'Frida Kahlo' },
        { id: '3', label: 'Berta Meier' },
        { id: '4', label: 'Mike Müller' },
        { id: '5', label: 'Hans Peter' },
        { id: '6', label: 'Franz Weber' },
        { id: '7', label: 'Franziska Weberin' },
        { id: '8', label: 'Angela Merkel' },
    ]

    const refs = Array.from({ length: 20 }, () => ref(''))
    const inputSelectRef = ref({
        id: '',
        label: '',
    })

    function vModel(n: number) {
        return refAsVModel(refs[n])
    }

    const form = createValidatedForm()
    const onSubmit = () => alert('Form was submitted!')

    return () => (
        <ComponentSection
            title="Inputs and Forms"
            subtitle="Handle user input well with these inputs and forms."
            id="inputs"
        >
            <VariantSection
                title="Plain HTML"
                subtitle="Wherever it is possible, the html features are used. The inputs can be selected by specifying the type attribute."
            >
                <NForm>
                    <ComponentGrid cols={2}>
                        <NInput {...vModel(0)} name="Name" />
                        <NInput {...vModel(1)} name="Age" type="number" />
                        <NInput {...vModel(2)} name="Password" type="password" />
                        <div class="space-y-2">
                            <NSelect
                                {...vModel(3)}
                                name="Country"
                                optional
                                options={[
                                    { id: 'ch', label: 'Switzerland' },
                                    { id: 'de', label: 'Germany' },
                                    { id: 'au', label: 'Austria' },
                                ]}
                            />
                            <p class="text-xs text-default-500">{`Value of the field: ${vModel(3).value}`}</p>
                        </div>
                        <div class="space-y-2">
                            <NInput {...vModel(4)} name="Date" type="date" />
                            <p class="text-xs text-default-500">{`Value of the field: ${vModel(4).value}`}</p>
                        </div>
                        <div class="space-y-2">
                            <NInput {...vModel(5)} name="Time" type="time" />
                            <p class="text-xs text-default-500">{`Value of the field: ${vModel(5).value}`}</p>
                        </div>
                    </ComponentGrid>
                </NForm>
            </VariantSection>

            <VariantSection
                title="Input Validation"
                subtitle="Inputs can be validated using different rules. Some inputs also implement a custom formatter, like the input for phone numbers."
            >
                <NForm>
                    <ComponentGrid cols={2}>
                        <NValInput {...vModel(15)} name="First Name" />
                        <NValInput {...vModel(16)} name="Last Name" rules={length(2, undefined)} />
                        <NValInput {...vModel(6)} name="Age" type="number" rules={[integer, numberRange(0, 120)]} />
                        <NValInput {...vModel(7)} name="Email" type="email" rules={email} />
                        <NValInput {...vModel(8)} name="Password" type="password" rules={password} />
                        <NValInput
                            {...vModel(9)}
                            name="Repeat Password"
                            type="password"
                            rules={[matches(refs[8].value)]}
                        />
                        <NValInput
                            {...vModel(10)}
                            name="Regex"
                            rules={regex(/^foo.*bar$/)}
                            placeholder="Try foo...bar"
                        />
                        <div class="space-y-2">
                            <NInputPhone {...vModel(11)} name="Mobile" />
                            <p class="text-xs text-default-500">{`Value of the field: ${vModel(11).value}`}</p>
                        </div>
                    </ComponentGrid>
                </NForm>
            </VariantSection>

            <VariantSection
                title="Text Areas"
                subtitle="If longer text is needed, the text area can be used. It provides most of the feature of a validated input."
            >
                <div class="space-y-4">
                    <NTextArea
                        {...vModel(17)}
                        name="Resizable Text Area"
                        placeholder="This text area can be resized with the handle with max 100 characters, which is required to fill out."
                        maxLength={100}
                    />
                    <NTextArea
                        {...vModel(18)}
                        name="Larger Text Area"
                        placeholder="This is a larger non-resizable optional text area."
                        rows={5}
                        resizable={false}
                        optional
                    />
                </div>
            </VariantSection>

            <VariantSection
                title="Suggestion Lists"
                subtitle="The left input just shows filtered suggestions and allows any input. The right input expects the user to pick an item from the list."
            >
                <ComponentGrid cols={2}>
                    <div class="space-y-2">
                        <NInputSuggestion
                            {...vModel(12)}
                            suggestions={suggestions.map(sugg => sugg.label)}
                            name="Any Person"
                        />
                        <p class="text-xs text-default-500">{`Value of the field: ${vModel(12).value}`}</p>
                    </div>
                    <div class="space-y-2">
                        <NInputSelect {...refAsVModel(inputSelectRef)} options={suggestions} name="Choose Person" />
                        <p class="text-xs text-default-500">{`Value of the field: ${JSON.stringify(
                            inputSelectRef.value
                        )}`}</p>
                    </div>
                </ComponentGrid>
            </VariantSection>

            <VariantSection
                title="Forms"
                subtitle="Validated Inputs can be added to forms. When trying to submit the form, all inputs are validated first and only if the validation succeeds, the form is submitted."
            >
                <NForm form={form} onSubmit={onSubmit}>
                    <ComponentGrid cols={2}>
                        <NValInput name="First Name" form={form} {...vModel(13)} />
                        <NValInput name="Last name" form={form} {...vModel(14)} />
                        <div class="flex ">
                            <NButton type="submit">Submit Form</NButton>
                        </div>
                    </ComponentGrid>
                </NForm>
            </VariantSection>
        </ComponentSection>
    )
})
