import { Toast } from "@base-ui/react";
import type { ReactNode } from "react";

type ToastProviderPropsType = {
  children: ReactNode
}

export default function ToastProvider({ children }: ToastProviderPropsType) {
  return (
    <Toast.Provider limit={1} timeout={2000}>
      <Toast.Portal>
        <Toast.Viewport>
          { children }
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}