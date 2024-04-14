import { ToastContainer } from 'react-toastify';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import { BoardProvider } from './context/BoardContext.tsx';
import { TodoProvider } from './context/TodoContext.tsx';
import './index.scss';


function App() {
    return (
        <div className="app-container">
            <BoardProvider>
                <TodoProvider>
                    <Header/>
                    <Router/>
                    <Footer/>
                </TodoProvider>
            </BoardProvider>
            <ToastContainer {...toastConfig} />
        </div>
    );
}
export default App;
