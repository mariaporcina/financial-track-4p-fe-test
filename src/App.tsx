import './App.css'
import type { ReactNode } from "react";

type AppPropsType = {
  children: ReactNode
}

function App({ children }: AppPropsType) {

  return (
    <div className='dark:bg-background-primary'>
      { children }
    </div>
  )
}

export default App
