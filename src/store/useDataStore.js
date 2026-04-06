import { create } from 'zustand';

export const useDataStore = create((set) => ({
  clients: [
    { id: 1, name: "María Gómez", document: "10293847", phone: "3104567890", status: "al_dia", balance: 500000, installment: 25000 },
    { id: 2, name: "Carlos López", document: "19283746", phone: "3119876543", status: "atrasado", balance: 1200000, installment: 50000 },
    { id: 3, name: "Tienda El Progreso", document: "88997766", phone: "3201112233", status: "al_dia", balance: 300000, installment: 15000 },
    { id: 4, name: "Ferretería San Juan", document: "55443322", phone: "3145558899", status: "al_dia", balance: 1500000, installment: 75000 },
    { id: 5, name: "Pedro Patiño", document: "11223344", phone: "3004445566", status: "atrasado", balance: 80000, installment: 10000 },
  ],
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
