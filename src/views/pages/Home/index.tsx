import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"
import TransactionList from "../../components/TransactionList"

import Pagination from "../../components/Pagination";
import RegisterModal from "../../components/modals/RegisterModal";
import { Dialog } from "@base-ui/react";

import styles from '../../../index.module.css';

import { useState } from "react";
import { useTransactions } from "../../../queries/useTransaction";

const Home = () => {
  const [type, setType] = useState<"income" | "outcome" | undefined | null>();
  const [deleted, setDeleted] = useState<boolean>(false);

  const { data, isLoading, error } = useTransactions({ type, deleted });

  if (isLoading) return <p>Carregando...</p>
  
  if (error) return <p>Erro ao carregar</p>

  return (
    <>
      <Header>
        <RegisterModal>
          <Dialog.Trigger className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Novo valor</Dialog.Trigger>
        </RegisterModal>
      </Header>
      
      <Filter
        type={type}
        setType={setType}
        deleted={deleted}
        setDeleted={setDeleted}
      />

      <Container>
        <TransactionList transactions={data} />

        {data?.length ? <Pagination /> : null}
      </Container>
    </>
  )
}

export default Home
