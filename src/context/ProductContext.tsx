import React, { createContext, useReducer, useEffect, Dispatch, ReactNode } from 'react';
import { Categories } from '../api/Categories';
import { GroupProducts } from '../api/Group-products';
import { Products } from '../api/Products';
import { CategoryType, GroupProductType, ProductType } from '../types/ProductTypes';

interface State {
  categories: CategoryType[];
  groupProducts: GroupProductType[];
  products: ProductType[];
}

type Action =
  | { type: 'SET_CATEGORIES'; payload: CategoryType[] }
  | { type: 'SET_GROUP_PRODUCTS'; payload: GroupProductType[] }
  | { type: 'SET_PRODUCTS'; payload: ProductType[] };

const initialState: State = {
  categories: [],
  groupProducts: [],
  products: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_GROUP_PRODUCTS':
      return { ...state, groupProducts: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const ProductsContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, groupProductsResponse, productsResponse] = await Promise.all([
          Categories.fetchCategories(),
          GroupProducts.fetchGroupProducts(),
          Products.fetchProducts(),
        ]);

        dispatch({ type: 'SET_CATEGORIES', payload: categoriesResponse });
        dispatch({ type: 'SET_GROUP_PRODUCTS', payload: groupProductsResponse });
        dispatch({ type: 'SET_PRODUCTS', payload: productsResponse });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
