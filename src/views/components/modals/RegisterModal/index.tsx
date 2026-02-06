import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog } from '@base-ui/react/dialog';
import { Button, NumberField, Toggle, ToggleGroup } from '@base-ui/react';
import modalStyles from './index.module.css';

import { Cross2Icon } from "@radix-ui/react-icons";

import styles from '../../../../index.module.css';
import { formatCurrency, parseCurrency } from '../../../../utils/HandleNumberField';
import type { TransactionFormValues } from '../../../../schemas/TransactionForm.schema';
import { TRANSACTION_FORM_DEFAULTS, validateTransactionAmount } from '../../../../schemas/TransactionForm.schema';

type RegisterModalPropsType = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTransaction: (data: TransactionFormValues) => void | Promise<void>;
};

export default function RegisterModal({
  dialogOpen,
  setDialogOpen,
  addTransaction,
}: RegisterModalPropsType) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    defaultValues: TRANSACTION_FORM_DEFAULTS,
    mode: 'onChange',
  });

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) reset(TRANSACTION_FORM_DEFAULTS);
      setDialogOpen(open);
    },
    [reset, setDialogOpen]
  );

  const onSubmit = React.useCallback(
    (data: TransactionFormValues) => {
      addTransaction(data);
      setDialogOpen(false);
    },
    [addTransaction, setDialogOpen]
  );

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>
        Novo valor
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className={modalStyles.Backdrop} />

        <Dialog.Popup className={`${modalStyles.Popup}`}>
          <div className='flex justify-between items-start'>
            <Dialog.Title className={modalStyles.Title}>Quanto você quer adicionar?</Dialog.Title>

            <span
              onClick={() => setDialogOpen(false)}
              className='cursor-pointer -m-1.5 p-1.5 bg-[#262626] rounded-full'
            >
              <Cross2Icon className='size-4.5 text-[#737373]' />
            </span>
          </div>

          <form className={modalStyles.TextareaContainer} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: 'O valor é obrigatório.',
                validate: (value) => validateTransactionAmount(value),
              }}
              render={({ field }) => (
                <NumberField.Root>
                  <NumberField.Input
                    placeholder="R$ 0,00"
                    value={formatCurrency(field.value)}
                    onChange={(e) => {
                      const parsed = parseCurrency(e.target.value);
                      field.onChange(parsed);
                    }}
                    onBlur={field.onBlur}
                    className={modalStyles.NumberField}
                    aria-invalid={!!errors.amount}
                  />
                </NumberField.Root>
              )}
            />
            {errors.amount && (
              <span className="text-[#DB2777] text-sm">{errors.amount.message}</span>
            )}

            <div className={modalStyles.Actions}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <ToggleGroup
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className={modalStyles.ToggleGroup}
                  >
                    <Toggle
                      aria-label="income"
                      value="income"
                      disabled={field.value === 'income'}
                      className={modalStyles.ToggleButton}
                    >
                      Entrada
                    </Toggle>
                    <Toggle
                      aria-label="outcome"
                      value="outcome"
                      disabled={field.value === 'outcome'}
                      className={modalStyles.ToggleButton}
                    >
                      Saída
                    </Toggle>
                  </ToggleGroup>
                )}
              />

              <Button
                type="submit"
                className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}
              >
                Adicionar
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
