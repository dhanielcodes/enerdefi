import clsx from 'clsx'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type ToastVariant = 'success' | 'info' | 'error' | 'warning'

interface ToastOptions {
  variant: ToastVariant
  title: string
  message: ReactNode
}

interface Toast extends ToastOptions {
  id: number
}

const variantStyles = {
  success: { Icon: CheckCircle2, container: 'border-green-500 bg-green-50', iconColor: 'text-green-600' },
  info: { Icon: Info, container: 'border-blue-500 bg-blue-50', iconColor: 'text-blue-600' },
  error: { Icon: XCircle, container: 'border-red-500 bg-red-50', iconColor: 'text-red-600' },
  warning: { Icon: AlertTriangle, container: 'border-amber-500 bg-amber-50', iconColor: 'text-amber-600' },
}

const TOAST_DURATION_MS = 5000

const ToastContext = createContext<((toast: ToastOptions) => void) | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = Date.now() + Math.random()
      setToasts((current) => [...current, { ...options, id }])
      setTimeout(() => dismiss(id), TOAST_DURATION_MS)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div className="fixed top-20 right-4 left-4 z-50 flex flex-col items-end gap-3 sm:left-auto">
        {toasts.map((toast) => {
          const { Icon, container, iconColor } = variantStyles[toast.variant]

          return (
            <div
              key={toast.id}
              role="status"
              className={clsx(
                'animate-slide-in flex w-full max-w-sm gap-3 rounded-lg border border-l-4 p-4 shadow-md',
                container,
              )}
            >
              <Icon className={clsx('mt-0.5 size-5 shrink-0', iconColor)} />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-gray-900">{toast.title}</p>
                <p className="mt-1 text-gray-600">{toast.message}</p>
              </div>
              <button
                aria-label="Dismiss notification"
                onClick={() => dismiss(toast.id)}
                className="self-start text-gray-500 hover:text-gray-800"
              >
                <X className="size-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const showToast = useContext(ToastContext)
  if (!showToast) {
    throw new Error('useToast must be used inside <ToastProvider>')
  }
  return showToast
}
