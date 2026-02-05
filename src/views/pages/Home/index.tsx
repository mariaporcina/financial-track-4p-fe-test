import Header from "../../components/Header"
import Filter from "../../components/Filter"
import Container from "../../components/Container"

import RegisterModal from "../../components/modals/RegisterModal";

import { useCreateTransactions } from "../../../queries/hooks/useCreateTransactions" 
import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";


const Home = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [amountValue, setAmounValue] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<"income" | "outcome">('income');

  const search = useSearch({ from: '/transactions' });
  const navigate = useNavigate({ from: '/transactions' });

  const { type, deleted } = search;
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
      type: selectedType,
      amount: amountValue,
    });
  }
  
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
        
        <Outlet />
      </Container>
    </>
  )
}

export default Home
