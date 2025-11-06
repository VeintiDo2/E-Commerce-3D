import { createContext, useContext, useState } from "react";

type ProductContextType = {
    selectedProductID: string | null;
    setSelectedProductID: React.Dispatch<React.SetStateAction<string | null>>;
    filters: {
        price: number;
        category: string;
        searchTerm: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        price: number;
        category: string;
        searchTerm: string;
    }>>;
};

const ContextProduct = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedProductID, setSelectedProductID] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        price: 3000,
        category: "Todos",
        searchTerm: "",
    });

    return (
        <ContextProduct.Provider value={{ selectedProductID, setSelectedProductID, filters, setFilters }}>
            {children}
        </ContextProduct.Provider>
    );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ContextProduct);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};