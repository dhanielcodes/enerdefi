import { CategoryPicker } from './CategoryPicker'
import { FormField } from './FormField'
import { FormSection, SubHeading } from './FormSection'

export function OverviewStep() {
  return (
    <div className="space-y-5">
      <FormSection title="Project Information">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">Project Category:</p>
          <CategoryPicker />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <FormField name="projectName" />
          <FormField name="country" />
          <FormField name="projectType" />
          <FormField name="state" />
          <FormField name="sector" />
          <FormField name="siteAddress" />
          <FormField
            name="projectSummary"
            hint="Briefly describe the project's scope, capacity and goals."
            className="md:col-span-2"
          />
        </div>
      </FormSection>

      <FormSection title="Sponsor/Company Details">
        <SubHeading>Company Info</SubHeading>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField name="companyName" />
          <FormField name="registrationNumber" />
          <FormField name="entityType" />
          <FormField name="registeredAddress" />
          <FormField name="incorporationDate" />
          <FormField name="taxId" />
          <FormField name="jurisdiction" />
        </div>

        <SubHeading>Contact Person</SubHeading>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField name="contactName" className="md:col-start-1" />
          <FormField name="contactEmail" className="md:col-start-1" />
        </div>

        <SubHeading>Supporting Documents</SubHeading>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField name="ownershipStructure" />
          <FormField name="boardOfDirectors" />
          <FormField name="trackRecordDocuments" />
          <FormField name="auditedFinancials" />
          <FormField name="complianceDeclaration" className="md:col-span-2" />
          <FormField name="litigationHistory" />
        </div>
      </FormSection>

      <FormSection title="Sponsor Track Record">
        <SubHeading>Company Info</SubHeading>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField name="completedProjects" />
          <FormField name="caseStudyUrl" />
          <FormField name="deployedCapacity" />
          <FormField name="caseStudyFile" />
        </div>
      </FormSection>
    </div>
  )
}
