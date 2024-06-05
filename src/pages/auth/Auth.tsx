import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { AuthService } from "../../api/AuthService";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onSwitch: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitch }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await AuthService.login(login, password, navigate);
      alert('Login successful!');
    } catch (error) {
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <h1>Войти</h1>
        <form onSubmit={handleSubmit} className="container-inputs">
          <div>
            <Input
              placeholder="Login"
              value={login}
              onChange={handleLoginChange}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button
            size="large"
            background="base"
            color="basic"
            disabled={login.length === 0 || password.length === 0}
          >
            Войти
          </Button>
        </form>
        <div className="switch">
          <span onClick={onSwitch}>Нет аккаунта? Регистрация</span>
        </div>
      </div>
    </div>
  );
};
interface RegisterProps {
  onSwitch: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitch }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await AuthService.register(login, password, email, profilePicture);
      alert('Registration successful!');
    } catch (error) {
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <h1>Создать профиль</h1>
        <form onSubmit={handleSubmit} className="container-inputs">
          <div>
            <Input
              placeholder="Login"
              value={login}
              onChange={handleLoginChange}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <Input
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <input
              type="file"
              onChange={handleProfilePictureChange}
            />
          </div>
          <Button
            size="large"
            background="base"
            color="basic"
            disabled={login.length === 0 || password.length === 0 || email.length === 0}
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className="switch">
          <span onClick={onSwitch}>Уже есть аккаунт? Войти</span>
        </div>
      </div>
    </div>
  );
};


export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleSwitch = () => {
    setIsRegister(!isRegister);
  };

  return (
    <>
      {isRegister ? (
        <Register onSwitch={handleSwitch} />
      ) : (
        <Login onSwitch={handleSwitch} />
      )}
    </>
  );
};