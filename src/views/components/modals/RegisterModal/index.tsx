'use client';
import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Button, NumberField, Toggle, ToggleGroup } from '@base-ui/react';
import modalStyles from './index.module.css';
import { useState } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";

import styles from '../../../../index.module.css';
import { formatCurrency, parseCurrency } from '../../../../utils/HandleNumberField';

type RegisterModalPropsType = {
  children: React.ReactNode
}

export default function RegisterModal({ children }: RegisterModalPropsType) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amountValue, setAmounValue] = useState(0);
  const [selectedType, setSelectedType] = useState('income');

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(open) => {
        setAmounValue(0);

        setDialogOpen(open);
      }}
    >

      { children }

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
              <ToggleGroup defaultValue={['income']} className={modalStyles.ToggleGroup}>
                <Toggle onPressedChange={() => { setSelectedType('income') }} aria-label="income" value="income" disabled={selectedType === 'income'} className={modalStyles.ToggleButton}>Entrada</Toggle>
                <Toggle onPressedChange={() => { setSelectedType('outcome') }} aria-label="outcome" value="outcome" disabled={selectedType === 'outcome'} className={modalStyles.ToggleButton}>Saída</Toggle>
              </ToggleGroup>

              <Button className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Novo valor</Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
