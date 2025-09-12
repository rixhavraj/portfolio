import { usescrollAnimation } from '../../hooks/usescrollAnimation'

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeInUp({ children, delay = 0, className = '' }: FadeInUpProps) {
  const { ref, isVisible } = usescrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}