/* eslint react-refresh/only-export-components: ["warn", { "allowExportNames": ["usePizzas"] }] */
import { createContext, useContext, useEffect, useState } from "react";
const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      const res = await fetch("http://localhost:5000/api/pizzas");
      const data = await res.json();
      setPizzas(data);
    };
    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzas = () => useContext(PizzaContext);
