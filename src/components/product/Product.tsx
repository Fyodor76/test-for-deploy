import { FC } from "react";
import { ProductType } from "../../types/ProductTypes";
import { LazyImage } from "../lazyImage/LazyImage";
import { baseURL } from "../../const/baseUrl";
import { Button } from "../../ui/Button/Button";
import StarIcon from '@mui/icons-material/Star';
import { useModal } from "../../hooks/Modal/useModal";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../Modal/Modal";
import { CommentsModal } from "../commentsModal/CommentsModal";

export const Product: FC<{ product: ProductType }> = ({product}) => {
    const {openModal, closeModal, modalState} = useModal();

    return (
        <div className="product">
           <LazyImage src={`${baseURL}${product.imageUrl}`} alt=""/>
           <div className="price">
                <span>
                    {product.price} Р
                </span>
           </div>
           <div className="name">{product.name}</div>
           <div className="feedbacks">
                <div className="rate">
                    <div className="icon-star"><StarIcon color="warning"/></div>
                    <span>{product.rate}</span>
                </div>
                <div className="comments-number" onClick={() => openModal(<CommentsModal productId={product.id} closeModal={closeModal}/>)}>
                    <span>{getCommentLabel(product.commentsNumber)}</span>
                </div>
           </div>
           <Button size='medium' color='basic' background='base' onClick={() => {}}>       
                <span>В корзину</span>
            </Button>
        <AnimatePresence initial={false}>
            {modalState.isOpen && <Modal closeModal={closeModal} template={modalState.template} show={modalState.isOpen}/>}
       </AnimatePresence>
        </div>
    );
};


const getCommentLabel = (number: number) => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${number} оценок`;
    }
  
    switch (lastDigit) {
      case 1:
        return `${number} оценка`;
      case 2:
      case 3:
      case 4:
        return `${number} оценки`;
      default:
        return `${number} оценок`;
    }
  };
  
  
