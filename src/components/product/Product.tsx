import { FC } from "react";
import { ProductType } from "../../types/ProductTypes";

export const Product: FC<{ product: ProductType }> = () => {
    return (
        <div className="product">
           Product
        </div>
    );
};
