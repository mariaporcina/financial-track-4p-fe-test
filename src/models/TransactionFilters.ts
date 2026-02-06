export type TransactionType = "income" | "outcome" | null;

export type DeletedFilter = boolean;

export type TransactionFilters = {
  type?: TransactionType;
  deleted?: DeletedFilter;
  page?: number;
  limit?: number;
};
