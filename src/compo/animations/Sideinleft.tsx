import { usescrollAnimation } from '../../hooks/usescrollAnimation'

interface SlideInLeftProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function SlideInLeft({ children, delay = 0, className = '' }: SlideInLeftProps) {
  const { ref, isVisible } = usescrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}