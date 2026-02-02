import type { ReactNode } from "react"

type ContainerPropsType = {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerPropsType) => {
  return (
    <div className={`mx-auto w-full max-w-[592px] px-[20px] ${className}`}>
      {children}
    </div>
  )
}

export default Container
