'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import type { Template } from '@/lib/types'

interface TemplatesTableProps {
  templates: Template[]
  onToggleActive?: (templateId: string, currentStatus: boolean) => Promise<void>
}

export function TemplatesTable({ templates, onToggleActive }: TemplatesTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleToggle = async (templateId: string, currentStatus: boolean) => {
    if (!onToggleActive) return
    setUpdatingId(templateId)
    try {
      await onToggleActive(templateId, currentStatus)
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e8c97e]/20 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdf8f4] border-b border-[#e8c97e]/20 text-xs font-bold text-[#6b3d2a] uppercase tracking-wider">
              <th className="px-6 py-4">Template Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Tier</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Credit Cost</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8c97e]/10 text-sm text-[#2a1810]">
            {templates.map((template) => (
              <tr key={template.id} className="hover:bg-[#fdf8f4]/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold">{template.name}</div>
                  <span className="text-[10px] text-[#a07060] font-mono block">slug: {template.slug}</span>
                </td>
                <td className="px-6 py-4 capitalize text-xs">
                  {template.category}
                </td>
                <td className="px-6 py-4 capitalize text-xs">
                  <span className="font-medium text-[#6b3d2a]">{template.tier}</span>
                </td>
                <td className="px-6 py-4 font-medium">
                  {formatPrice(template.price)}
                </td>
                <td className="px-6 py-4 font-medium">
                  {template.credit_cost} credit{template.credit_cost !== 1 ? 's' : ''}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    template.is_active
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}>
                    {template.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={template.html_file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 mr-2 transition-colors inline-block"
                  >
                    Preview
                  </a>
                  {onToggleActive && (
                    <button
                      onClick={() => handleToggle(template.id, template.is_active)}
                      disabled={updatingId === template.id}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        template.is_active
                          ? 'border-red-200 text-red-600 hover:bg-red-50'
                          : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {template.is_active ? 'Hide Card' : 'Show Card'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
