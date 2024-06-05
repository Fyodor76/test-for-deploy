import { ToastContainer } from 'react-toastify';
import axiosInstance from './axios.config.ts';

import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Router } from './components/router/Router.tsx';
import { toastConfig } from './const/toastConfig.ts';
import './index.scss';
import { ProductsProvider } from './context/ProductsContext.tsx';
import { useEffect } from 'react';
import { Categories } from './api/Categories.ts';

const categories = [
    {
      name: 'Аксессуары',
      description: 'Большой выбор аксессуаров для всех.'
    },
    {
      name: 'Головные уборы',
      description: 'Стильные и практичные головные уборы на любой вкус.'
    },
    {
      name: 'Красота',
      description: 'Косметика и средства для ухода за кожей и волосами.'
    },
    {
      name: 'Одежда',
      description: 'Модная и комфортная одежда для всей семьи.'
    },
    {
      name: 'Товары для животных',
      description: 'Все для ухода за вашими питомцами.'
    },
    {
      name: 'Обувь',
      description: 'Качественная обувь для любой погоды.'
    },
    {
      name: 'Продукты',
      description: 'Свежие и вкусные продукты питания.'
    }
  ];
  

function App() {

    useEffect(() => {

    }, [])

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
