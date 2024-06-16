import { useContext } from "react"
import { Button } from "../../ui/Button/Button"
import { ProductsContext } from "../../context/ProductContext"
import { Product } from "../../components/product/Product"
import { useUrlParams } from "../../context/UrlParamContext"
import { FilterPanel } from "../../components/filterPanel/FilterPanel"

export const Main = () => {
    const {state: {products}} = useContext(ProductsContext)
    const { resetParams } = useUrlParams();

    return (
        <div className="main">
            <div className="main-header">
                <div className="filters-container">
                    <FilterPanel/>
                </div>
            </div>
            <div className="container">
                {products.length ? products?.map((pr) => <Product key={pr.id} product={pr}/>) : <div><h1>Ничего не найдено</h1></div>}
            </div>
        </div>
    )
}
