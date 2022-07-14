import NButton from '@/components/base/NButton'
import NForm from '@/components/base/NForm'
import NInput from '@/components/base/NInput'
import NSelect from '@/components/base/NSelect'
import NValInput from '@/components/base/NValInput'
import { createValidatedForm } from '@/components/base/ValidatedForm'
import ComponentGrid from '@/components/presentation/ComponentGrid'
import ComponentSection from '@/components/presentation/ComponentSection'
import VariantSection from '@/components/presentation/VariantSection'
import { email, regex, matches } from '@/utils/validation'
import { createView, refAsVModel } from '@/utils/vue'
import { ref } from 'vue'

const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+\-=!*()@%&?]).{8,}$/

export default createView('InputView', () => {
    // NInput
    // NValInput
    // NSelect
    // Form

    const refs = Array.from({ length: 10 }, () => ref(''))

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
            <VariantSection title="Different types">
                <NForm>
                    <ComponentGrid cols={2}>
                        <NInput {...vModel(0)} name="Name" />
                        <NInput {...vModel(1)} name="Age" type="number" />
                        <NInput {...vModel(2)} name="Password" type="password" />
                        <NSelect
                            {...vModel(3)}
                            name="Country"
                            optional
                            options={[
                                { key: 'ch', label: 'Switzerland' },
                                { key: 'de', label: 'Germany' },
                                { key: 'au', label: 'Austria' },
                            ]}
                        />
                    </ComponentGrid>
                </NForm>
            </VariantSection>

            <VariantSection title="Input Validation" subtitle="Inputs can be validated using different rules.">
                <NForm>
                    <ComponentGrid cols={2}>
                        <NValInput {...vModel(4)} name="Name" />
                        <NValInput {...vModel(5)} name="Email" type="email" rules={[email]} />
                        <NValInput {...vModel(6)} name="Password" type="password" rules={[regex(PASSWORD_FORMAT)]} />
                        <NValInput
                            {...vModel(7)}
                            name="Repeat Password"
                            type="password"
                            rules={[matches(() => refs[6].value)]}
                        />
                    </ComponentGrid>
                </NForm>
            </VariantSection>

            <VariantSection
                title="Forms"
                subtitle="Validated Inputs can be added to forms. When trying to submit the form, all inputs are validated first and only if the validation succeeds, the form is submitted."
            >
                <NForm form={form} onSubmit={onSubmit}>
                    <ComponentGrid cols={2}>
                        <NValInput name="First Name" form={form} {...vModel(8)} />
                        <NValInput name="Last name" form={form} {...vModel(9)} />
                        <div class="flex ">
                            <NButton type="submit">Submit Form</NButton>
                        </div>
                    </ComponentGrid>
                </NForm>
            </VariantSection>
        </ComponentSection>
    )
})
