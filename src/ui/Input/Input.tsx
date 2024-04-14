import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
interface InputType {
    placeholder: string;
    icon?: string;
}
export const Input: FC<InputType> = ({ placeholder }) => {
  const [value, setValue] = useState<string>('');
  return (
    <div
      className="input-container">
      {value && <div className="input-icons">
        <CloseIcon className="icon" onClick={() => setValue('')}/>
        <SearchIcon className="icon"/>
      </div>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
      />
    </div>
  );
};
