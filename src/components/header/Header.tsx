import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Transition } from 'react-transition-group';
import Hamburger from 'hamburger-react';
import { useState, ChangeEvent } from 'react';

import logo from '../../assets/logo.svg';
import { Sidebar } from '../sidebar/Sidebar.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import './index.scss';
import {Link} from "react-router-dom";
import {Button} from "../../ui/Button/Button.tsx";


export const Header = () =>  {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value

    setValue(v)
  }

  const clearInput = () => {
    setValue("")
  }


  return (
    <header className="header">
      <div className="container">
        <Transition in={isOpen} timeout={300}>
          <Sidebar isOpen={isOpen}/>
        </Transition>
        <Link className="header__logo" to="./wb-front">
        <img src={logo}/>
        </Link>
        <div className="header__hamburger">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={25}
            color="white"
          />
        </div>
        <div className="header__input__container">
          <Input
            placeholder="Найти на Wildberries"
            value={value} 
            onChange={onChange}
            onClick={clearInput}
            isCloseIcon
            isSearchIcon
             />
        </div>
        <div className="header__icon__container">
          <Link className="header__icon login" to="./wb-front/login">
            <PersonIcon/>
            <div className="header__container__login">
              <div className="header__icon__text">
                <span>Войти</span>
              </div>
              <div className="header__modal__login">
                  <Button size='large' color='basic' background='base'>
                    <Link className="header__icon login" to="./wb-front/login">
                      Войти или создать профиль
                    </Link>
                  </Button>
              </div>
            </div>
          </Link>
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

