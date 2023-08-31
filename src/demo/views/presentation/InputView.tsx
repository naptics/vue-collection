import NButton from '@/lib/components/NButton'
import NForm from '@/lib/components/NForm'
import NInput from '@/lib/components/NInput'
import NSelect from '@/lib/components/NSelect'
import NValInput from '@/lib/components/NValInput'
import { createValidatedForm } from '@/lib/components/ValidatedForm'
import ComponentGrid from '@/demo/components/ComponentGrid'
import ComponentSection from '@/demo/components/ComponentSection'
import VariantSection from '@/demo/components/VariantSection'
import { email, matches, password, regex, integer, numberRange, length } from '@/lib/utils/validation'
import { createView } from '@/lib/utils/component'
import { ref } from 'vue'
import NInputSelect from '@/lib/components/NInputSelect'
import NInputSuggestion from '@/lib/components/NInputSuggestion'
import NInputPhone from '@/lib/components/NInputPhone'
import { vModelForRef } from '@/lib/utils/vModel'
import NTextArea from '@/lib/components/NTextArea'

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

    const refs = Array.from({ length: 21 }, () => ref(''))

    function vModel(n: number) {
        return vModelForRef(refs[n])
    }

    const form = createValidatedForm()
    const onSubmit = () => alert('Form was submitted!')

    const showDynamicInput = ref(true)

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
                        <NInputSelect {...vModel(19)} options={suggestions} name="Choose Person" />
                        <p class="text-xs text-default-500">{`Value of the field: ${vModel(19).value}`}</p>
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
                        {showDynamicInput.value && <NValInput name="Hello World" form={form} {...vModel(20)} />}

                        <div class="flex space-x-2 items-end">
                            <NButton
                                color="secondary"
                                onClick={() => (showDynamicInput.value = !showDynamicInput.value)}
                            >
                                Toggle Input
                            </NButton>
                            <NButton type="submit">Submit Form</NButton>
                        </div>
                    </ComponentGrid>
                </NForm>
            </VariantSection>
        </ComponentSection>
    )
})
