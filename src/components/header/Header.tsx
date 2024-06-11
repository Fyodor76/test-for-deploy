import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Hamburger from 'hamburger-react';
import { useState, ChangeEvent, useContext, FC, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import { Sidebar } from '../sidebar/Sidebar.tsx';
import { Input } from '../../ui/Input/Input.tsx';
import './index.scss';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {Button} from "../../ui/Button/Button.tsx";
import { AuthContext, logoutAction } from '../../context/AuthContext.tsx';
import { AuthService } from '../../api/AuthService.ts';
import { showToast } from '../../const/toastConfig.ts';
import { ProductsContext } from '../../context/ProductContext.tsx';
import debounce from 'lodash/debounce';
import { Products } from '../../api/Products.ts';

interface HeaderType {
  handleLoading: () => void;
}

const debouncedUpdateUrl = debounce((updateUrl: (queryParams: { query?: string; group?: string }) => void, query: string) => {
  updateUrl({ query });
}, 1000);

  export const Header: FC<HeaderType> = ({handleLoading}) => {
    const [isOpen, setOpen] = useState(false);
    const [value, setValue] = useState<string>('');
    const { state: authContext, dispatch: dispatchAuth } = useContext(AuthContext);
    const {dispatch } = useContext(ProductsContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
  
    const logout = async () => {
      await AuthService.logout();
      dispatchAuth(logoutAction());
      navigate('/wb-front/login');
      showToast("success", "Вы вышли из аккаунта");
    };
  
    const updateUrl = (queryParams: { query?: string; group?: string }) => {
      const params = new URLSearchParams(searchParams);
  
      if (queryParams.query !== undefined) {
        if (queryParams.query) {
          params.set('query', queryParams.query);
        } else {
          params.delete('query');
        }
      }
  
      if (queryParams.group !== undefined) {
        if (queryParams.group) {
          params.set('group', queryParams.group);
        } else {
          params.delete('group');
        }
      }
  
      setSearchParams(params);
    };
  
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(value);
      debouncedUpdateUrl(updateUrl, value);
    };
  
    const clearInput = () => {
      setValue('');
      updateUrl({ query: '' });
    };
  
    useEffect(() => {
      const query = searchParams.get('query') || "";
      const group = searchParams.get('group') || "";
  
      const fetchProducts = async () => {
        try {
          const results = await Products.searchProducts({ query, group });
          dispatch({ type: 'SET_PRODUCTS', payload: results });
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
  
      fetchProducts();
    }, [searchParams, dispatch]);

    return (
      <header className="header">
        <div className="container">
          <Sidebar isOpen={isOpen} />
          <Link className="header__logo" to="./wb-front">
            <img src={logo} alt="logo" />
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
              name="value"
              onChange={onChange}
              onClick={clearInput}
              isCloseIcon
              isSearchIcon
            />
          </div>
          <div className="header__icon__container">
            <Link className="header__icon login" to={!authContext.isAuth ? "./wb-front/login" : "./wb-front/profile"}>
              <PersonIcon />
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
              <ShoppingBasketIcon />
              <div className="header__icon__text">
                Корзина
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };
