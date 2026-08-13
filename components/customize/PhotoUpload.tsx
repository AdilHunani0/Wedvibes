'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface PhotoUploadProps {
  photos: string[]
  onChange: (urls: string[]) => void
  maxPhotos: number
}

export function PhotoUpload({ photos, onChange, maxPhotos }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (photos.length + files.length > maxPhotos) {
      setError(`You can upload a maximum of ${maxPhotos} photo${maxPhotos > 1 ? 's' : ''} for this tier.`)
      return
    }

    setUploading(true)
    setError(null)

    const uploadedUrls: string[] = [...photos]

    try {
      for (const file of files) {
        // Basic size & type validation
        if (!file.type.startsWith('image/')) {
          throw new Error('Only image files are allowed.')
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Images must be smaller than 5MB.')
        }

        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.error || 'Failed to upload image')
        }

        const data = await res.json()
        uploadedUrls.push(data.url)
      }

      onChange(uploadedUrls)
    } catch (err: unknown) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong during upload.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removePhoto = (indexToRemove: number) => {
    onChange(photos.filter((_, i) => i !== indexToRemove))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-semibold text-[#2a1810]">
          Upload Photos ({photos.length}/{maxPhotos})
        </label>
        <span className="text-xs text-[#a07060]">Max 5MB each. JPG, PNG.</span>
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg font-medium">
          {error}
        </div>
      )}

      {/* Grid of uploaded/previews */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {photos.map((url, index) => (
          <div
            key={url}
            className="group relative aspect-square bg-[#f7efe8] rounded-xl overflow-hidden border border-[#e8c97e]/30 hover:border-[#c9a96e] transition-all duration-300"
          >
            <Image
              src={url}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 bg-red-600/90 text-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
              Slot {index + 1}
            </div>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square bg-[#fdf8f4] border-2 border-dashed border-[#e8c97e]/50 hover:border-[#c9a96e] hover:bg-[#f7efe8]/30 rounded-xl flex flex-col items-center justify-center gap-2 text-[#6b3d2a] hover:text-[#2a1810] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            {uploading ? (
              <LoadingSpinner size="sm" className="text-[#a0522d]" />
            ) : (
              <>
                <span className="text-2xl group-hover:scale-110 transition-transform">📷</span>
                <span className="text-xs font-semibold">Add Photo</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple={maxPhotos - photos.length > 1}
        className="hidden"
      />
    </div>
  )
}
