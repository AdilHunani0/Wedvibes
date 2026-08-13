'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface AddTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddTemplateModal({ isOpen, onClose, onSuccess }: AddTemplateModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'wedding',
    tier: 'basic',
    price: '',
    credit_cost: '',
    html_file_path: '/templates/',
    features: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const featuresArray = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0)

      const payload = {
        action: 'create',
        template: {
          ...formData,
          price: Number(formData.price),
          credit_cost: Number(formData.credit_cost),
          features: featuresArray
        }
      }

      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create template')
      }

      toast.success('Template created successfully!')
      onSuccess()
      onClose()

      // Reset form
      setFormData({
        name: '',
        slug: '',
        category: 'wedding',
        tier: 'basic',
        price: '',
        credit_cost: '',
        html_file_path: '/templates/',
        features: ''
      })
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || 'Error creating template')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Template" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Template Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Royal Gold"
          />
          <Input
            label="Slug (URL friendly)"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="e.g. royal-gold-wedding"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#2a1810]">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#e8c97e]/60 text-sm bg-white text-[#2a1810] outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[#c9a96e]/20"
            >
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#2a1810]">Tier</label>
            <select
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#e8c97e]/60 text-sm bg-white text-[#2a1810] outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[#c9a96e]/20"
            >
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price (in paise)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g. 49900 for ₹499"
          />
          <Input
            label="Credit Cost"
            name="credit_cost"
            type="number"
            value={formData.credit_cost}
            onChange={handleChange}
            required
            placeholder="e.g. 1, 2, or 3"
          />
        </div>

        <Input
          label="HTML File Path"
          name="html_file_path"
          value={formData.html_file_path}
          onChange={handleChange}
          required
          placeholder="/templates/filename.html"
          hint="Path to the uploaded HTML file in public folder"
        />

        <Textarea
          label="Features (comma separated)"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="Scroll reveal, 4 photo slots, RSVP button"
          rows={3}
        />

        <div className="pt-4 flex justify-end gap-3 border-t border-[#f7efe8]">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Template'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
