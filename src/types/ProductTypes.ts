export interface Category {
    id: string;
    name: string;
    description: string;
  }
  
  export interface GroupProduct {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    imageUrl: string;
  }
  
  interface Product {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    groupProductId: string;
    imageUrl: string;
    price: number;
  }