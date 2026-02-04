import './App.css'
import type { ReactNode } from "react";
import { ToastList } from './views/components/CustomToast/ToastList';

type AppPropsType = {
  children: ReactNode
}

function App({ children }: AppPropsType) {

  return (
    <div className='dark:bg-background-primary'>
      { children }

      <ToastList />
    </div>
  )
}

export default App
