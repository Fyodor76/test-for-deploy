import { useContext } from "react"
import { Product } from "../../components/product/Product"
import { ProductsContext, filterProducts } from "../../context/ProductsContext"
import { Button } from "../../ui/Button/Button"

export const Main = () => {
    
    return (
        <div className="main">
            <div className="main-header">
                <div>
                    <h1>Добро пожаловать на главную страницу Wildberries!</h1>
                </div>
                <div className="reset-filters">
                    <Button size="small" background="base" color="basic" >Сбросить фильтры</Button>
                </div>
            </div>
            <div className="container">
            </div>
        </div>
    )
}