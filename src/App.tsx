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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLoading = () => {
    setIsLoading((prev) => !prev)
  }

  const handleOpenSidebar = () => {
    console.log('dsadasd')
    setSidebarOpen((prev) => !prev)
  }

  
  
  return (
    <AuthProvider>
      <UrlParamsProvider>
        <ProductsProvider>
            <div className="app-container" onClick={() => setSidebarOpen(false)}>
              <Header handleLoading={handleLoading} isSidebarOpen={isSidebarOpen} handleOpenSidebar={handleOpenSidebar}/>
              <Router />
              <Footer />
              <ToastContainer {...toastConfig} />
              {isLoading && <Loader/>}
            </div>
        </ProductsProvider>
      </UrlParamsProvider>
    </AuthProvider>
  );
}
export default App;
