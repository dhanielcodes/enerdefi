import clsx from 'clsx'
import { UploadCloud } from 'lucide-react'
import { useRef, useState, type DragEvent } from 'react'
import { ACCEPT_ATTRIBUTE, UPLOAD_HINT } from '@/lib/files'

interface DropzoneProps {
  id?: string
  onFileSelect: (file: File) => void
  onClick?: () => void
  isInvalid?: boolean
}

export function Dropzone({ id, onFileSelect, onClick, isInvalid }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleDragOver(event: DragEvent) {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    if (file) onFileSelect(file)
  }

  return (
    <>
      <button
        id={id}
        type="button"
        onClick={onClick ?? (() => fileInputRef.current?.click())}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={clsx(
          'flex w-full flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-5 text-center transition-colors',
          isDragging && 'border-brand-500 bg-brand-50',
          !isDragging && (isInvalid ? 'border-red-400 bg-red-50/40' : 'border-gray-300 hover:bg-gray-50'),
        )}
      >
        <UploadCloud className="size-5 text-gray-500" />
        <span className="text-xs text-gray-600">
          <span className="font-semibold text-brand-500">Click to upload</span> or drag and drop
        </span>
        <span className="text-[11px] text-gray-400">{UPLOAD_HINT}</span>
      </button>

      {!onClick && (
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept={ACCEPT_ATTRIBUTE}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) onFileSelect(file)
            event.target.value = ''
          }}
        />
      )}
    </>
  )
}
