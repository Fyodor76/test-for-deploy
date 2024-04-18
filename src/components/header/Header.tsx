import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Transition } from 'react-transition-group';
import Hamburger from 'hamburger-react';
import { useState } from 'react';

import logo from '../../assets/logo.svg';
import { Sidebar } from '../sidebar/Sidebar.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import './index.scss';


export const Header = () =>  {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <Transition in={isOpen} timeout={300}>
          <Sidebar isOpen={isOpen}/>
        </Transition>
        <a className="header__logo" href="/">
          <img src={logo}/>
        </a>
        <div className="header__hamburger">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={25}
            color="white"
          />
        </div>
        <div className="header__input__container">
          <Input placeholder="Найти на Wildberries" />
        </div>
        <div className="header__icon__container">
          <a className="header__icon" href="./test-for-deploy/login">
            <PersonIcon/>
            <div className="header__icon__text">
                      Войти
            </div>
          </a>
          <div className="header__icon">
            <ShoppingBasketIcon/>
            <div className="header__icon__text">
                      Корзина
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

