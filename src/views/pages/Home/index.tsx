import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"

import RegisterModal from "../../components/modals/RegisterModal";

import { useCreateTransactions } from "../../../queries/hooks/useCreateTransactions" 
import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";


const Home = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const search = useSearch({ from: '/transactions' });
  const navigate = useNavigate({ from: '/transactions' });

  const { type, deleted } = search;
  const setFilter = (key: "type" | "deleted", value?: string | boolean) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
        page: 1,
      }),
    });
  };

  const { mutateAsync: create } = useCreateTransactions();
  const handleCreateTransaction = async (data: { type: 'income' | 'outcome'; amount: number }) => {
    await create({ type: data.type, amount: data.amount });
  };

  return (
    <>
      <Container>
        <div className="flex justify-between my-15">
          <Header />

          <RegisterModal
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            addTransaction={handleCreateTransaction}
          />
        </div>
        
        <Filter
          type={type}
          setFilter={setFilter}
          deleted={deleted}
        />
        
        <Outlet />
      </Container>
    </>
  )
}

export default Home
