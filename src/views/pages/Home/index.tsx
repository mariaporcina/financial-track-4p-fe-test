import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"
import TransactionList from "../../components/TransactionList"

import Pagination from "../../components/Pagination";
import RegisterModal from "../../components/modals/RegisterModal";
import { Dialog } from "@base-ui/react";

import styles from '../../../index.module.css';

import { useTransactions } from "../../../queries/useTransaction";
import { useNavigate, useSearch } from "@tanstack/react-router";

const Home = () => {
  const search = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });

  const { type, deleted } = search;

  const { data, isLoading, error } = useTransactions({ type, deleted });

  const setFilter = (key: "type" | "deleted", value?: string | boolean) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
      }),
    });
  };

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
