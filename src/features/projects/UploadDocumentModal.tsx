import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { uploadDocument } from '@/api/projects'
import { Button } from '@/components/ui/Button'
import { Dropzone } from '@/components/ui/Dropzone'
import { FileCard } from '@/components/ui/FileCard'
import { Modal } from '@/components/ui/Modal'
import { getFileError, removeExtension } from '@/lib/files'
import type { UploadedDocument } from '@/types'

interface UploadDocumentModalProps {
  initialFile?: File
  onClose: () => void
  onUploaded: (document: UploadedDocument) => void
}

export function UploadDocumentModal({ initialFile, onClose, onUploaded }: UploadDocumentModalProps) {
  const initialError = initialFile ? getFileError(initialFile) : null

  const [documentName, setDocumentName] = useState('')
  const [file, setFile] = useState(initialFile && !initialError ? initialFile : null)
  const [error, setError] = useState(initialError)

  const upload = useMutation({
    mutationFn: (selectedFile: File) =>
      uploadDocument(selectedFile, documentName.trim() || removeExtension(selectedFile.name)),
    onSuccess: onUploaded,
  })

  function selectFile(selectedFile: File) {
    const fileError = getFileError(selectedFile)
    setError(fileError)
    setFile(fileError ? null : selectedFile)
  }

  return (
    <Modal isOpen onClose={onClose} title="Upload Document">
      <label htmlFor="document-name" className="mb-1.5 block text-xs font-medium text-gray-700">
        Document Name
      </label>
      <input
        id="document-name"
        value={documentName}
        onChange={(event) => setDocumentName(event.target.value)}
        placeholder="Enter document name"
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
      />

      <p className="mt-5 mb-1.5 text-xs font-medium text-gray-700">Upload document</p>
      {file ? (
        <FileCard
          title={file.name}
          fileName="100%"
          size={file.size}
          onRemove={() => setFile(null)}
        />
      ) : (
        <Dropzone onFileSelect={selectFile} isInvalid={Boolean(error)} />
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {upload.isError && <p className="mt-2 text-xs text-red-600">Upload failed. Please try again.</p>}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={onClose}>
          Dismiss
        </Button>
        <Button disabled={!file || upload.isPending} onClick={() => file && upload.mutate(file)}>
          {upload.isPending ? 'Uploading…' : 'Save Document'}
        </Button>
      </div>
    </Modal>
  )
}
