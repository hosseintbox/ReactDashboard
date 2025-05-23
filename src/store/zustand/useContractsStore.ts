import { create } from "zustand";

interface ContractState {
  contractValues: any; // یا نوع دقیق‌تر
  setContractValues: (values: any) => void;
}

const useContractsStore = create<ContractState>((set) => ({
  contractValues: null,
  setContractValues: (values) => set({ contractValues: values }),
}));

export default useContractsStore;
