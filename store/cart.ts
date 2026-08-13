'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Template, CustomizationFormData } from '@/lib/types'

interface CartState {
  selectedTemplate: Template | null
  customizationData: Partial<CustomizationFormData>
  currentStep: number
  uploadedPhotos: string[]
  setTemplate: (template: Template) => void
  setCustomizationData: (data: Partial<CustomizationFormData>) => void
  setCurrentStep: (step: number) => void
  addPhoto: (url: string) => void
  removePhoto: (url: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      selectedTemplate: null,
      customizationData: {},
      currentStep: 1,
      uploadedPhotos: [],

      setTemplate: (template) => set({ selectedTemplate: template }),

      setCustomizationData: (data) =>
        set((state) => ({
          customizationData: { ...state.customizationData, ...data },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      addPhoto: (url) =>
        set((state) => ({
          uploadedPhotos: [...state.uploadedPhotos, url],
        })),

      removePhoto: (url) =>
        set((state) => ({
          uploadedPhotos: state.uploadedPhotos.filter((p) => p !== url),
        })),

      clearCart: () =>
        set({
          selectedTemplate: null,
          customizationData: {},
          currentStep: 1,
          uploadedPhotos: [],
        }),
    }),
    {
      name: 'wedvibe-cart',
    }
  )
)
