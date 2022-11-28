export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  action?: () => void
}

export const Button = ({
  children,
  className,
  action,
  ...props
}: IButtonProps) => {
  return (
    <button
      {...props}
      className={
        'flex gap-2 px-2 py-2 border-2 rounded hover:text-white text-lg font-medium transition-colors ' +
        (className ?? '')
      }
      onClick={action}
    >
      {children}
    </button>
  )
}
