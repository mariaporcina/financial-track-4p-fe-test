import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"
import TransactionList from "../../components/TransactionList"

import Pagination from "../../components/Pagination";
import RegisterModal from "../../components/modals/RegisterModal";
import { Dialog } from "@base-ui/react";

import styles from '../../../index.module.css';

import { useQueryTransactions } from "../../../queries/hooks/useQueryTransactions";
import { useCreateTransactions } from "../../../queries/hooks/useCreateTransactions" 
import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { use, useEffect, useState } from "react";
import { useRemoveTransactions } from "../../../queries/hooks/useRemoveTransactions";
import { useRestoreTransactions } from "../../../queries/hooks/useRestoreTransactions";
import { useGetOneTransaction } from "../../../queries/hooks/useGetOneTransaction";
import type { Transaction } from "../../../schemas/Transaction.schema";


const Home = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [amountValue, setAmounValue] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<"income" | "outcome">('income');

  const search = useSearch({ from: '/transactions' });
  const navigate = useNavigate({ from: '/transactions' });

  const { type, deleted } = search;
  const { data: transactions, isLoading, error } = useQueryTransactions({ type, deleted });
  const setFilter = (key: "type" | "deleted", value?: string | boolean) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
      }),
    });
  };

  const { mutateAsync: create } = useCreateTransactions();
  const handleCreateTransaction = async () => {
    await create({
      id: "tx_00" + Math.floor((Math.random() * 100) + 3),
      type: selectedType,
      amount: amountValue,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  const { mutateAsync: remove } = useRemoveTransactions();

  const { mutateAsync: restore } = useRestoreTransactions();

  const handleOpenDetails = (id: string) => {

    // const transaction = transactions?.find(t => t.id === id);

    // console.log(transaction)

    // navigate({
    //   search: (prev) => ({
    //     ...prev,
    //     selected: id,
    //   }),
    // })

    // setDialogOpen(true);
    // setAmounValue(transaction?.amount || 0);

    // console.log(id)
    // setCurrentId(id);

    // if(transactionRes) {
    //   setDialogOpen(true);
    //   setAmounValue(transactionRes?.amount || 0);
    //   console.log(transactionRes)
    // }
  }

  

  // console.log(transactionRes)
  
  
  if (isLoading) return <p>Carregando...</p>
  
  if (error) return <p>Erro ao carregar</p>

  return (
    <>
      

      <Container>
        <div className="flex justify-between my-15">
          <Header />

          <RegisterModal
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            amountValue={amountValue}
            setAmounValue={setAmounValue}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            addTransaction={handleCreateTransaction}
          />
        </div>
        
        <Filter
          type={type}
          setFilter={setFilter}
          deleted={deleted}
        />
        
        <TransactionList
          transactions={transactions}
          handleRemove={remove}
          handleRestore={restore}
          handleItemClick={handleOpenDetails}
        />

        {transactions?.length ? <Pagination /> : null}
        
        <Outlet />
      </Container>
    </>
  )
}

export default Home
