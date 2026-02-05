
import { useEffect, useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Button, NumberField, Toggle, ToggleGroup } from '@base-ui/react';
import modalStyles from './index.module.css';

import { Cross2Icon } from "@radix-ui/react-icons";

import styles from '../../../../index.module.css';
import { formatCurrency, parseCurrency } from '../../../../utils/HandleNumberField';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetOneTransaction } from '../../../../queries/hooks/useGetOneTransaction';
import { transactionDetailRoute } from '../../../../main';
import { useUpdateTransactions } from '../../../../queries/hooks/useUpdateTransactions';

export default function ViewModal() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);
  const [amountValue, setAmounValue] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<"income" | "outcome">('income');

  const navigate = useNavigate();
  const { id } = useParams({ from: transactionDetailRoute.id });

  const { data, isLoading: isFetching } = useGetOneTransaction(id);

  useEffect(() => {
    if(isFetching || !data) return;
    
    setAmounValue(data?.amount);
    setSelectedType(data?.type);
    
  }, [data, isFetching]);

  const { mutateAsync: update, isPending: isUpdating } = useUpdateTransactions();

  const handleUpdateTransaction = async () => {
    if(isFetching || !data) return;

    const payload = {
      id: data.id,
      data: {
        type: selectedType,
        amount: amountValue,
      }
    }

    await update(payload);
  }

  const isLoading = isFetching || isUpdating;
  
  return (
    <Dialog.Root
      open={dialogOpen}
    >

      <Dialog.Portal>
        <Dialog.Backdrop className={modalStyles.Backdrop} />

        <Dialog.Popup className={`${modalStyles.Popup}`}>

          {isLoading && (
            <div className='flex justify-between items-start'>
              <Dialog.Title className={modalStyles.Title}>Carregando...</Dialog.Title>
              
              <span
                onClick={() => { navigate({ to: '/transactions' }); setDialogOpen(false) }}
                className='cursor-pointer -m-1.5 p-1.5 bg-[#262626] rounded-full'
              >
                <Cross2Icon className='size-4.5 text-[#737373]' />
              </span>
            </div>
          )}

          {!isLoading && (
            <>
              <div className='flex justify-between items-start'>
                <Dialog.Title className={modalStyles.Title}>Valor</Dialog.Title>
                
                <span
                  onClick={() => { navigate({ to: '/transactions' }); setDialogOpen(false) }}
                  className='cursor-pointer -m-1.5 p-1.5 bg-[#262626] rounded-full'
                >
                  <Cross2Icon className='size-4.5 text-[#737373]' />
                </span>
              </div>

              <form
                className={modalStyles.TextareaContainer}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleUpdateTransaction();
                  navigate({ to: '/transactions' });
                }}
              >
                <NumberField.Root>
                  <NumberField.Input
                    required
                    placeholder="R$ 0,00"
                    value={formatCurrency(amountValue)}
                    onChange={(e) => {
                      setAmounValue(parseCurrency(e.target.value))
                    }}
                    className={modalStyles.NumberField}
                  />
                </NumberField.Root>

                <div className={modalStyles.Actions}>
                  <ToggleGroup  value={[selectedType]} onValueChange={(value) => setSelectedType(value[0])} defaultValue={['income']} className={modalStyles.ToggleGroup}>
                    <Toggle aria-label="income" value="income" disabled={selectedType === 'income'} className={modalStyles.ToggleButton}>Entrada</Toggle>
                    <Toggle aria-label="outcome" value="outcome" disabled={selectedType === 'outcome'} className={modalStyles.ToggleButton}>Saída</Toggle>
                  </ToggleGroup>

                  <Button type="submit" className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Salvar alterações</Button>
                </div>
              </form>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
