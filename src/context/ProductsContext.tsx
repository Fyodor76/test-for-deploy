import React, {
    createContext, useReducer, useEffect,
  } from 'react';
  
import { ProductsTypeObject } from '../types/ProductType';
import { ProductsApi } from '../api/Products';
import { setRandomColor } from '../helpers/setRandomColor';
  
  type State = {
    allProducts: ProductsTypeObject[];
    filteredProducts:  ProductsTypeObject[]
  };
  
  type Action =
  | { type: 'SET_PRODUCTS'; payload: ProductsTypeObject[] }
  | { type: 'FILTER_PRODUCTS'; payload: string };
  
  const initialState: State = { allProducts: [], filteredProducts: [] };
  
  const reducer = (state: State, action: Action) => {
    switch (action.type) {  
      case 'SET_PRODUCTS':
        return { ...state, allProducts: action.payload, filteredProducts: action.payload };
      case 'FILTER_PRODUCTS':
        const filtered = state.allProducts.filter(product =>
          product.row.brand_name.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.row.subj_root_name.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.row.subj_name.toLowerCase().includes(action.payload.toLowerCase())
        );
        return { ...state, filteredProducts: filtered };
      default:
        return state;
    }
  };
  
  export const ProductsContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
  }>({
    state: initialState,
    dispatch: () => null,
  });
  
  export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    useEffect(() => {
      const getProducts = async () => {
        const response = await ProductsApi.getProducts();
        const productsWithBackgroundColor = response.data.rows.map((r) => {
            return {
                row: {
                    ...r.row,
                    backgroundColor: setRandomColor()
                }
            }
        })
        dispatch(setProducts(productsWithBackgroundColor));
      };
      getProducts();
    }, []);
  
    return (
      <ProductsContext.Provider value={{ state, dispatch }}>
        {children}
      </ProductsContext.Provider>
    );
  };
  
  export const setProducts = (products: ProductsTypeObject[]): Action => ({
    type: 'SET_PRODUCTS',
    payload: products,
  });
 
  export const filterProducts = (searchTerm: string): Action => ({
    type: 'FILTER_PRODUCTS',
    payload: searchTerm,
  });