import { FileText, Trash2 } from 'lucide-react'
import { formatFileSize } from '@/lib/format'

interface FileCardProps {
  title: string
  fileName: string
  size: number
  onRemove: () => void
}

export function FileCard({ title, fileName, size, onRemove }: FileCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
      <FileText className="mt-0.5 size-5 shrink-0 text-red-500" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">{title}</p>
        <p className="truncate text-xs text-gray-500">
          {fileName} · {formatFileSize(size)}
        </p>
      </div>
      <button aria-label={`Remove ${title}`} onClick={onRemove} className="text-gray-500 hover:text-red-600">
        <Trash2 className="size-4" />
      </button>
    </div>
  )
}
