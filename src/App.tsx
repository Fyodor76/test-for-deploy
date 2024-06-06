import { ToastContainer } from 'react-toastify';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import './index.scss';
import { ProductsProvider } from './context/ProductsContext.tsx';
import { useEffect } from 'react';
import { Categories } from './api/Categories.ts';
import { AuthProvider } from './context/AuthContext.tsx';
  

function App() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Categories.fetchCategories();
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    

    return (
        <AuthProvider> {/* Оборачиваем все приложение в AuthProvider */}
        <div className="app-container">
          <ProductsProvider>
            <Header />
            <Router />
            <Footer />
          </ProductsProvider>
          <ToastContainer {...toastConfig} />
        </div>
      </AuthProvider>
    );
}
export default App;
