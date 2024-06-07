import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Transition } from 'react-transition-group';
import Hamburger from 'hamburger-react';
import { useState, ChangeEvent, useContext } from 'react';

import logo from '../../assets/logo.svg';
import { Sidebar } from '../sidebar/Sidebar.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import './index.scss';
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../../ui/Button/Button.tsx";
import { AuthContext, logoutAction } from '../../context/AuthContext.tsx';
import { AuthService } from '../../api/AuthService.ts';
import { showToast } from '../../const/toastConfig.ts';


export const Header = () =>  {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState<{value: string}>({value: ''});
 // const {dispatch} = useContext(ProductsContext)
  const {state: authContext, dispatch: dispatchAuth} = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = async () => {
    await AuthService.logout()
    dispatchAuth(logoutAction())
    navigate('/wb-front/login');
    showToast("success", "Вы вышли из аккаунта")
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setValue((prev) => ({...prev, [name]: value}));
   // dispatch(filterProducts(value));
  };

  const clearInput = (name: string) => {
    setValue((prev) => ({...prev, [name]: ''}))
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
            value={value.value} 
            name="value"
            onChange={onChange}
            onClick={clearInput}
            isCloseIcon
            isSearchIcon
             />
        </div>
        <div className="header__icon__container">
          <Link className="header__icon login" to={!authContext.isAuth ? "./wb-front/login" : "./wb-front/profile"}>
            <PersonIcon/>
            <div className="header__container__login">
              <div className="header__icon__text">
                {!authContext.isAuth ? <span>Войти</span> : <span>Профиль</span>}
              </div>
              <div className="header__modal__login">
              {!authContext.isAuth ?  
              <Button size='large' color='basic' background='base'>       
                   <Link className="header__icon login" to="./wb-front/login">
                      Войти или создать профиль
                    </Link>
              </Button>
                  : 
              <div className='header__modal__profile'>
                <Button size='medium' color='basic' background='base'>       
                  <Link className="header__icon login" to="./wb-front/profile">
                      Открыть профиль
                  </Link>
              </Button>
              <Button size='medium' color='basic' background='base' onClick={logout}>       
                <span>Выйти</span>
              </Button>
              </div>
                  }
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

