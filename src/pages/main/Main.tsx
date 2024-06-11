import { useContext } from "react"
import { Button } from "../../ui/Button/Button"
import { ProductsContext } from "../../context/ProductContext"
import { Product } from "../../components/product/Product"

export const Main = () => {
    const {state: {products}} = useContext(ProductsContext)

    console.log(products, 'products')
    return (
        <div className="main">
            <div className="main-header">
                <div className="title">
                    <h1>Добро пожаловать на главную страницу Wildberries!</h1>
                </div>
                <div className="reset-filters">
                    <Button size="small" background="base" color="basic" >Сбросить фильтры</Button>
                </div>
            </div>
            <div className="container">
                {products.length ? products?.map((pr) => <Product key={pr.id} product={pr}/>) : <div><h1>Ничего не найдено</h1></div>}
            </div>
        </div>
    )
}
