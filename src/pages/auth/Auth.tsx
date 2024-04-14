export const Auth = () => {
  return (
    <div className="auth">
      <div className="container">
        <p>Войти или создать профиль</p>
        <input placeholder="number"/>
        <button>
                   Получить код
        </button>
        <input type="checkbox"/>
        <p>Соглашаюсь с правилами пользования торговой площадкой и возврата</p>
      </div>
    </div>
  );
};
