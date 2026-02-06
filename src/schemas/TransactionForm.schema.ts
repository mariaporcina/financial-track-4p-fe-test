export type TransactionFormValues = {
  amount: number;
  type: 'income' | 'outcome';
};

export const TRANSACTION_FORM_DEFAULTS: TransactionFormValues = {
  amount: 0,
  type: 'income',
};

export function validateTransactionAmount(value: number): true | string {
  if (value == null || value <= 0) {
    return 'O valor deve ser maior que zero.';
  }
  return true;
}
