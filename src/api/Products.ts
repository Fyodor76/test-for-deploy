import axios from "axios";
import { ProductsTypeObject } from "../types/ProductType";
import { productsUrl } from "../const/urls";

export const ProductsApi = {
    getProducts: async () => {
      return await axios.get<{rows: ProductsTypeObject[]}>(`${productsUrl}`);
    },
  };
  