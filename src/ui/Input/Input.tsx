import { ChangeEvent, MouseEvent, FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
interface InputType {
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: MouseEvent<SVGSVGElement>) => void;
    value: string;
    isCloseIcon?: boolean;
    isSearchIcon?: boolean
}

export const Input: FC<InputType> = ({
   placeholder = "", 
   onChange = Function.prototype,
   onClick, 
   value = "", 
   isCloseIcon = false, 
   isSearchIcon = false
  }) => {
  return (
    <div
      className="input-container">
      {value && <div className="input-icons">
        { isCloseIcon && <CloseIcon className="icon" onClick={onClick}/>}
        { isSearchIcon && <SearchIcon className="icon"/>}
      </div>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event)}
        className="input"
      />
    </div>
  );
};
