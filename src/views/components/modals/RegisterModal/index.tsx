import * as React from 'react';
import { useEffect } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Button, NumberField, Toggle, ToggleGroup } from '@base-ui/react';
import modalStyles from './index.module.css';

import { Cross2Icon } from "@radix-ui/react-icons";

import styles from '../../../../index.module.css';
import { formatCurrency, parseCurrency } from '../../../../utils/HandleNumberField';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useGetOneTransaction } from '../../../../queries/hooks/useGetOneTransaction';

type RegisterModalPropsType = {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  amountValue: number,
  setAmounValue: React.Dispatch<React.SetStateAction<number>>
  selectedType: "income" | "outcome",
  setSelectedType: React.Dispatch<React.SetStateAction<"income" | "outcome">>,
  addTransaction: () => void
}

export default function RegisterModal({
  dialogOpen,
  setDialogOpen,
  amountValue,
  setAmounValue,
  selectedType,
  setSelectedType,
  addTransaction,
}: RegisterModalPropsType) {
  
  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(open) => {
        if(!open) {
          setAmounValue(0);
        }

        setDialogOpen(open);
      }}
    >

      <Dialog.Trigger className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Novo valor</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className={modalStyles.Backdrop} />

        <Dialog.Popup className={`${modalStyles.Popup}`}>
          <div className='flex justify-between items-start'>
            <Dialog.Title className={modalStyles.Title}>Quanto você quer adicionar?</Dialog.Title>
            
            <span
              onClick={() => { setDialogOpen(false) }}
              className='cursor-pointer -m-1.5 p-1.5 bg-[#262626] rounded-full'
            >
              <Cross2Icon className='size-4.5 text-[#737373]' />
            </span>
          </div>

          <form
            className={modalStyles.TextareaContainer}
            onSubmit={(event) => {
              event.preventDefault();
              addTransaction();
              setDialogOpen(false);
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

              <Button type="submit" className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Adicionar</Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
