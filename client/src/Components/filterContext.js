// import React, { useEffect, useContext, useReducer } from "react";
// import reducer from "./reducer/filter_reducer";

// const initialState = {
//   filter: {
//     text: "",
//     price: "0",
//   },
// };

// const FilterContext = React.createContext();

// export const FilterProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     dispatch({ type: "FILTER_PRODUCTS" });
//   }, [state.filter]);

//   const updateFilters = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     dispatch({ type: "UPDATE_FILTERS", payload: { name, value } });
//   };

//   return (
//     <FilterContext.Provider value={{ ...state, updateFilters }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilterContext = () => {
//   return useContext(FilterContext);
// };
