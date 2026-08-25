'use client'

import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { PhotoUpload } from './PhotoUpload'
import { TIER_MAX_PHOTOS } from '@/lib/constants'
import type { Template, CustomizationFormData, TemplateFormConfig } from '@/lib/types'

interface CustomizeFormProps {
  template: Template
  formData: CustomizationFormData
  setFormData: React.Dispatch<React.SetStateAction<CustomizationFormData>>
  schema: TemplateFormConfig
  currentStep: number
  setCurrentStep: (step: number) => void
  onSubmit: () => void
  onPayWithCredits: () => void
  userRole?: string
  userCredits?: number
  authLoading?: boolean
  submitting: boolean
  isEditing?: boolean
  onUpdate?: () => void
}

export function CustomizeForm({
  template,
  formData,
  setFormData,
  schema,
  currentStep,
  setCurrentStep,
  onSubmit,
  onPayWithCredits,
  userRole,
  userCredits,
  authLoading,
  submitting,
  isEditing,
  onUpdate,
}: CustomizeFormProps) {
  const maxPhotos = TIER_MAX_PHOTOS[template.tier] || 1

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotosChange = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, photo_urls: urls }))
  }

  const handleSpecificPhotosChange = (name: string, urls: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: urls }))
  }

  const currentStepConfig = schema.steps[currentStep - 1]

  const isStepValid = () => {
    if (!currentStepConfig) return true
    
    // Check all required fields in the current step
    for (const field of currentStepConfig.fields) {
      if (field.required) {
        const val = formData[field.name]
        if (!val || (typeof val === 'string' && val.trim() === '')) {
          return false
        }
      }
    }
    return true
  }

  const nextStep = () => {
    if (isStepValid() && currentStep < schema.steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-2xl border border-[#e8c97e]/20 shadow-xl">
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#a0522d] bg-[#fdf8f4] px-2.5 py-1 rounded-full border border-[#e8c97e]/50">
          Step {currentStep} of {schema.steps.length} · {currentStepConfig.title}
        </span>
        <h2 className="font-playfair text-xl font-bold text-[#2a1810] mt-3">
          Customise {template.name}
        </h2>
        <p className="text-xs text-[#a07060] mt-1">
          {currentStepConfig.description || 'Enter your details below. Changes reflect instantly in the preview.'}
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-2 pb-4">
        {currentStepConfig?.fields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <Textarea
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                required={field.required}
              />
            )
          }

          if (field.type === 'photo') {
            return (
              <div key={field.name} className="mt-4">
                <h4 className="text-sm font-semibold text-[#2a1810] mb-3">{field.label}</h4>
                <PhotoUpload
                  photos={formData[field.name] || []}
                  onChange={(urls) => handleSpecificPhotosChange(field.name, urls)}
                  maxPhotos={field.maxPhotos || maxPhotos}
                />
              </div>
            )
          }

          if (field.type === 'checkbox') {
            return (
              <div key={field.name} className="mt-4 flex items-center gap-3 bg-[#fdf8f4] p-3 rounded-xl border border-[#e8c97e]/30">
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
                  className="w-5 h-5 accent-[#a0522d] border-[#e8c97e]/50 rounded cursor-pointer"
                />
                <label htmlFor={field.name} className="text-sm font-medium text-[#2a1810] cursor-pointer select-none flex-1">
                  {field.label}
                </label>
              </div>
            )
          }

          return (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type === 'date' || field.type === 'time' ? field.type : 'text'}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          )
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-[#e8c97e]/20 flex justify-between gap-4">
        {currentStep > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>
            ← Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < schema.steps.length ? (
          <Button
            type="button"
            variant="primary"
            onClick={nextStep}
            disabled={!isStepValid()}
          >
            Next Step →
          </Button>
        ) : isEditing ? (
          <Button
            type="button"
            variant="primary"
            onClick={onUpdate}
            loading={submitting}
            disabled={!isStepValid() || submitting}
          >
            Save Changes ✓
          </Button>
        ) : authLoading ? (
          <Button
            type="button"
            variant="primary"
            loading={true}
            disabled={true}
          >
            Loading...
          </Button>
        ) : userRole === 'planner' || userRole === 'admin' ? (
          (userCredits ?? 0) >= (template.credit_cost || 0) ? (
            <Button
              type="button"
              variant="primary"
              onClick={onPayWithCredits}
              loading={submitting}
              disabled={!isStepValid() || submitting}
              className="bg-[#2a1810] text-[#e8c97e]"
            >
              Buy with {template.credit_cost || 0} Credits 🪙
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={() => window.location.href = '/dashboard/credits'}
              className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
            >
              Not enough credits ({userCredits} / {template.credit_cost || 0}). Buy More
            </Button>
          )
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={onSubmit}
            loading={submitting}
            disabled={!isStepValid() || submitting}
          >
            Pay & Generate Card 💳
          </Button>
        )}
      </div>
    </div>
  )
}
