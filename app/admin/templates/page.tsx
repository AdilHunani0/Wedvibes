'use client'

import { useEffect, useState } from 'react'
import { TemplatesTable } from '@/components/admin/TemplatesTable'
import { AddTemplateModal } from '@/components/admin/AddTemplateModal'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import type { Template } from '@/lib/types'
import toast from 'react-hot-toast'

export default function AdminTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates')
        if (!res.ok) throw new Error('Failed to fetch templates')
        const data = await res.json()
        setTemplates(data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load templates')
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  const reloadTemplates = async () => {
    try {
      const res = await fetch('/api/templates')
      if (res.ok) setTemplates(await res.json())
    } catch (e) {
      console.error(e)
    }
  }

  const handleToggleActive = async (templateId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, isActive: !currentStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update template status')
      }

      toast.success('Template visibility updated!')
      reloadTemplates() // Reload list
    } catch (err) {
      console.error(err)
      toast.error('Failed to toggle template visibility.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="text-[#a0522d]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-extrabold text-[#2a1810]">
            Manage Templates
          </h1>
          <p className="text-xs text-[#a07060] mt-1">
            Review, activate, or hide wedding and event card templates.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          + Add Template
        </Button>
      </div>

      <TemplatesTable templates={templates} onToggleActive={handleToggleActive} />

      <AddTemplateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={reloadTemplates} 
      />
    </div>
  )
}
