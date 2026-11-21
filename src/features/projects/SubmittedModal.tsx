import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

const confettiColors = ['#F26B21', '#22C55E', '#3B82F6', '#EAB308', '#EC4899', '#14B8A6']

function Confetti() {
  const pieces = Array.from({ length: 24 }, (_, index) => {
    const angle = (index / 24) * Math.PI * 2
    const distance = index % 2 === 0 ? 40 : 50
    return {
      x: 60 + Math.cos(angle) * distance,
      y: 60 + Math.sin(angle) * distance,
      rotation: index * 37,
      color: confettiColors[index % confettiColors.length],
    }
  })

  return (
    <svg viewBox="0 0 120 120" className="absolute inset-0" aria-hidden>
      {pieces.map((piece, index) => (
        <rect
          key={index}
          x={piece.x - 2}
          y={piece.y - 3}
          width={4}
          height={6}
          rx={1}
          fill={piece.color}
          transform={`rotate(${piece.rotation} ${piece.x} ${piece.y})`}
        />
      ))}
    </svg>
  )
}

interface SubmittedModalProps {
  isOpen: boolean
  onViewReport: () => void
  onViewDashboard: () => void
}

export function SubmittedModal({ isOpen, onViewReport, onViewDashboard }: SubmittedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onViewDashboard} label="Project submitted" className="text-center">
      <div className="relative mx-auto size-28">
        <Confetti />
        <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-green-500">
          <Check className="size-6 text-white" strokeWidth={3} />
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold">Project Submitted</h2>
      <p className="mt-2 text-sm text-gray-600">
        We will review your submission and notify you once the verification process is complete.
        This process typically takes 1-3 business days.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={onViewReport}>
          View Report
        </Button>
        <Button onClick={onViewDashboard}>View Dashboard</Button>
      </div>
    </Modal>
  )
}
