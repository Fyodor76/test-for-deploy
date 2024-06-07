export interface CategoryType {
    id: string;
    name: string;
    description: string;
  }
  
  export interface GroupProductType {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    imageUrl: string;
  }
  
  export interface ProductType {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    groupProductId: string;
    imageUrl: string;
    price: number;
  }