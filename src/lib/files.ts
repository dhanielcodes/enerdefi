const ACCEPTED_EXTENSIONS = ['pdf', 'svg', 'png', 'jpg', 'jpeg', 'gif']
const MAX_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024

export const ACCEPT_ATTRIBUTE = ACCEPTED_EXTENSIONS.map((extension) => `.${extension}`).join(',')
export const UPLOAD_HINT = 'PDF, SVG, PNG, JPG or GIF (max. 5MB)'

export function getFileError(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''

  if (!ACCEPTED_EXTENSIONS.includes(extension)) {
    return 'Only PDF, SVG, PNG, JPG or GIF files are allowed.'
  }
  if (file.size > MAX_FILE_SIZE_IN_BYTES) {
    return 'This file is larger than 5MB.'
  }
  return null
}

export function removeExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '')
}
