import { Toast } from "@base-ui/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "../index.module.css";

export const ToastList = () => {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className={styles.Toast}>
      <Toast.Content className={styles.Content}>
        <Toast.Title className={styles.Title} />
        <Toast.Description className={styles.Description} />
        
        <Toast.Close className={styles.Close} aria-label="Close">
          <Cross2Icon className={styles.Icon} />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
