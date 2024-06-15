import { useContext } from "react"
import { Button } from "../../ui/Button/Button"
import { ProductsContext } from "../../context/ProductContext"
import { Product } from "../../components/product/Product"
import { useUrlParams } from "../../context/UrlParamContext"

export const Main = () => {
    const {state: {products}} = useContext(ProductsContext)
    const { resetParams, params } = useUrlParams();

    console.log(params, 'params')
    return (
        <div className="main">
            <div className="main-header">
                <div className="title">
                    <h1>Добро пожаловать на главную страницу Wildberries!</h1>
                </div>
                <div className="reset-filters">
                    <Button size="small" background="base" color="basic" onClick={resetParams}>Сбросить фильтры</Button>
                </div>
            </div>
            <div className="container">
                {products.length ? products?.map((pr) => <Product key={pr.id} product={pr}/>) : <div><h1>Ничего не найдено</h1></div>}
            </div>
        </div>
    )
}
