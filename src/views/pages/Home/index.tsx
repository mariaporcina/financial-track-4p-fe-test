import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"
import TransactionList from "../../components/TransactionList"

import useTransactionViewModel from "../../../viewModels/UseTransactionViewModel";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";
import RegisterModal from "../../components/modals/RegisterModal";
import { Button, Dialog } from "@base-ui/react";

import styles from '../../../index.module.css';

const Home = () => {
  const { fetchAll } = useTransactionViewModel();

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchAll,
  });

  if (isLoading) return <p>Carregando...</p>
  
  if (error) return <p>Erro ao carregar</p>

  return (
    <>
      <Header>
        <RegisterModal>
          <Dialog.Trigger className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Novo valor</Dialog.Trigger>
        </RegisterModal>
      </Header>

      <Filter />

      <Container>
        <TransactionList transactions={data} />

        {data?.length ? <Pagination /> : null}
      </Container>
    </>
  )
}

export default Home
