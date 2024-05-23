import { useState, ChangeEvent } from "react";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";

export const Auth = () => {
  const [inputValue, setInputValue] = useState<string>("+7 ");

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D+/g, ''); // Удаляем все нечисловые символы
    const formattedValue = formatPhone(value);

    setInputValue(formattedValue);
  }

  const formatPhone = (value: string) => {
    let cleanValue = value.startsWith('7') ? value.substring(1) : value; // Обрезаем '7', если она в начале
    let formattedValue = "+7 ";

    // Теперь мы просто добавляем цифры по одной, вставляя пробелы, где это нужно
    if (cleanValue.length > 0) {
      formattedValue += cleanValue.substring(0, 3);
    }
    if (cleanValue.length > 3) {
      formattedValue += " " + cleanValue.substring(3, 6);
    }
    if (cleanValue.length > 6) {
      formattedValue += " " + cleanValue.substring(6, 8);
    }
    if (cleanValue.length > 8) {
      formattedValue += " " + cleanValue.substring(8, 10);
    }

    return formattedValue;
  }

  return (
    <div className="auth">
      <div className="container">
        <h1>Войти или создать профиль</h1>
        <div>
          <Input
            placeholder="+7 ___ ___ __ __"
            value={inputValue}
            onChange={handleInputValue}
          />
        </div>
        <Button size="large" background="base" color="basic">
          Получить код
        </Button>
        <div className="block-agreement">
          <span>Соглашаюсь с правилами пользования торговой площадкой и возврата</span>
        </div>
      </div>
    </div>
  );
};
