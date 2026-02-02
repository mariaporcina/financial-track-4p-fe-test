import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"
import TransactionList from "../../components/TransactionList"

import useTransactionViewModel from "../../../viewModels/UseTransactionViewModel";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";

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
      <Header />

      <Filter />

      <Container>
        <TransactionList transactions={data} />

        <Pagination />
      </Container>
    </>
  )
}

export default Home
