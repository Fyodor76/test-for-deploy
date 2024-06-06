import { ToastContainer } from 'react-toastify';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import './index.scss';
import { ProductsProvider } from './context/ProductsContext.tsx';
import { useEffect } from 'react';
import { Categories } from './api/Categories.ts';
  

function App() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await Categories.fetchCategories();
                console.log(categories);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    

    return (
        <div className="app-container">
                    <ProductsProvider>
                        <Header/>
                        <Router/>
                        <Footer/>
                    </ProductsProvider>
            <ToastContainer {...toastConfig} />
        </div>
    );
}
export default App;
