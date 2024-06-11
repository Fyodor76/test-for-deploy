import { FC } from "react";
import { ProductType } from "../../types/ProductTypes";
import { LazyImage } from "../lazyImage/LazyImage";
import { baseURL } from "../../const/baseUrl";
import { Button } from "../../ui/Button/Button";

export const Product: FC<{ product: ProductType }> = ({product}) => {
    return (
        <div className="product">
           <LazyImage src={`${baseURL}${product.imageUrl}`} alt=""/>
           <div className="price">
                <span>
                    {product.price} Р
                </span>
           </div>
           <div className="name">{product.name}</div>
           <Button size='medium' color='basic' background='base' onClick={() => {}}>       
                <span>В корзину</span>
            </Button>
        </div>
    );
};
