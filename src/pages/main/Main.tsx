import { useContext } from "react"
import { Product } from "../../components/product/Product"
import { ProductsContext } from "../../context/ProductsContext"


export const Main = () => {
    const {state} = useContext(ProductsContext)

    return (
        <div className="main">
            <div className="container">
                {state.filteredProducts.length > 0 ? state.filteredProducts?.map((p, i) => <Product key={i} product={p.row}/>) : null}
            </div>
        </div>
    )
}