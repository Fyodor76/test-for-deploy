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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addProduct = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const cart = document.querySelector(".header__icon");
    
      const productBlock = (e.target as HTMLElement).closest(".product") as HTMLElement; // блок товара, на который кликнули
    
      if (!productBlock) {
        return; // Если productBlock не найден, просто выходим из функции
      }
    
      const productCoordinates = productBlock.getBoundingClientRect(); // координаты блока товара
      const cartCoordinates = cart?.getBoundingClientRect(); // координаты корзины
    
      const clonedProduct = productBlock.cloneNode(true) as HTMLElement; // копия блока товара
      clonedProduct.style.position = "absolute";
      clonedProduct.style.left = productCoordinates.left - 100 + "px";
      clonedProduct.style.top = productCoordinates.top - 100 + "px";
      clonedProduct.style.opacity = "0.5";
      clonedProduct.style.transition = "all 1s ease-in-out";
    
      document.body.appendChild(clonedProduct); // добавляем копию на страницу
    
      // Анимация перемещения товара к корзине
      setTimeout(() => {
        if (cartCoordinates) {
          clonedProduct.style.left = cartCoordinates.left + "px";
          clonedProduct.style.top = cartCoordinates.top + "px";
        }
      }, 100);
    
      // Удаление копии товара после завершения анимации
      setTimeout(() => {
        document.body.removeChild(clonedProduct);
      }, 2000);
    };
    

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
           <Button size='medium' color='basic' background='base' onClick={() => addProduct()}>       
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
  
  
