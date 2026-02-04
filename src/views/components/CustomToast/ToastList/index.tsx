import { Toast } from "@base-ui/react";
import styles from "../index.module.css";

export const ToastList = () => {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className={styles.Toast} swipeDirection={['up']}>
      <Toast.Content className={styles.Content}>
        <Toast.Title className={styles.Title} />
        <Toast.Description className={styles.Description} />
      </Toast.Content>
    </Toast.Root>
  ));
}
