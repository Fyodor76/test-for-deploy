import { ToastContainer } from 'react-toastify';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import './index.scss';
import { AuthProvider } from './context/AuthContext.tsx';
import { ProductsProvider } from './context/ProductContext.tsx';
import { useState } from 'react';
import { Loader } from './components/loader/Loader.tsx';
import { UrlParamsProvider } from './context/UrlParamContext.tsx';
  

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  console.log(isLoading)
  const handleLoading = () => {
    setIsLoading((prev) => !prev)
  }
  
  return (
    <AuthProvider>
      <ProductsProvider>
        <UrlParamsProvider>
          <div className="app-container">
            <Header handleLoading={handleLoading}/>
            <Router />
            <Footer />
            <ToastContainer {...toastConfig} />
            {isLoading && <Loader/>}
          </div>
        </UrlParamsProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
export default App;
