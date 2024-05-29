import { ToastContainer } from 'react-toastify';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import './index.scss';
import { ProductsProvider } from './context/ProductsContext.tsx';

function App() {

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
