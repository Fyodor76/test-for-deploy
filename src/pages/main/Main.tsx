import { useContext } from "react"
import { Product } from "../../components/product/Product"
import { ProductsContext, filterProducts } from "../../context/ProductsContext"
import { Button } from "../../ui/Button/Button"

export const Main = () => {
    const {state, dispatch} = useContext(ProductsContext)

    const resetFilters = () => {
        dispatch(filterProducts(""));
    }

    return (
        <div className="main">
            <div className="main-header">
                <div>
                    <h1>Добро пожаловать на главную страницу Wildberries!</h1>
                </div>
                <div className="reset-filters">
                    <Button size="small" background="base" color="basic" onClick={resetFilters}>Сбросить фильтры</Button>
                </div>
            </div>
            <div className="container">
                {state.filteredProducts.length > 0 ? state.filteredProducts?.map((p, i) => <Product key={i} product={p.row}/>) : null}
            </div>
        </div>
    )
}