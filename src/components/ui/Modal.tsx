import clsx from 'clsx'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  label?: string
  className?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, label = title, className, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/40 p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={clsx(
          'animate-slide-in w-full max-w-md rounded-2xl bg-white p-6 shadow-xl',
          className,
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {title && <h2 className="mb-5 text-lg font-semibold text-gray-900">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  )
}
