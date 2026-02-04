import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"
import TransactionList from "../../components/TransactionList"

import Pagination from "../../components/Pagination";
import RegisterModal from "../../components/modals/RegisterModal";
import { Dialog } from "@base-ui/react";

import styles from '../../../index.module.css';

import { useQueryTransactions } from "../../../queries/hooks/useQueryTransactions";
import { useMutationTransactions } from "../../../queries/hooks/useMutationTransactions" 
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";


const Home = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [amountValue, setAmounValue] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<"income" | "outcome">('income');

  const search = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });

  const { type, deleted } = search;
  const { data, isLoading, error } = useQueryTransactions({ type, deleted });
  const setFilter = (key: "type" | "deleted", value?: string | boolean) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
      }),
    });
  };

  const { mutateAsync: create } = useMutationTransactions();
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
  
  if (isLoading) return <p>Carregando...</p>
  
  if (error) return <p>Erro ao carregar</p>

  return (
    <>
      <Header>
        <RegisterModal
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          amountValue={amountValue}
          setAmounValue={setAmounValue}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          addTransaction={handleCreateTransaction}
        >
          <Dialog.Trigger className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Novo valor</Dialog.Trigger>
        </RegisterModal>
      </Header>
      
      <Filter
        type={type}
        setFilter={setFilter}
        deleted={deleted}
      />

      <Container>
        <TransactionList transactions={data} />

        {data?.length ? <Pagination /> : null}
      </Container>
    </>
  )
}

export default Home
