import { ToastContainer } from 'react-toastify';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import './index.scss';


function App() {
    return (
        <div className="app-container">
                    <Header/>
                    <Router/>
                    <Footer/>
            <ToastContainer {...toastConfig} />
        </div>
    );
}
export default App;
