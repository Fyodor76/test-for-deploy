import { FC } from "react";
import { ProductType } from "../../types/ProductType";

export const Product: FC<{ product: ProductType }> = ({ product }) => {
    return (
        <div className="product">
            <div className="picture" style={{ backgroundColor: product.backgroundColor }}>Picture</div>
            <div className="root_name">
                <span>{product.subj_root_name}</span>
            </div>
            <div className="subj_name">
                <span>{product.subj_name}</span>
            </div>
            <div className="brand_name">
                <span>{product.brand_name}</span>
            </div>
            {product?.description && <div className="description">
                <b>Описание: </b>
                {product?.description}
                </div>}
        </div>
    );
};
