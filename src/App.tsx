import { ToastContainer } from 'react-toastify';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import './index.scss';
import { useEffect, useState } from 'react';
import { Categories } from './api/Categories.ts';
import { AuthProvider } from './context/AuthContext.tsx';
import { Loader } from './components/loader/Loader.tsx';
import { ProductsProvider } from './context/ProductContext.tsx';
  

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await Categories.fetchCategories();
                setIsLoading(false)
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    

    return (
        <AuthProvider>
          <ProductsProvider>
        <div className="app-container">
            <Header />
            <Router />
            <Footer />
            {isLoading &&<Loader/>}
          <ToastContainer {...toastConfig} />
        </div>
          </ProductsProvider>
      </AuthProvider>
    );
}
export default App;
