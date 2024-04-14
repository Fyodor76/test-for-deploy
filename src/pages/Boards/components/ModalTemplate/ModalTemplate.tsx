import {
  useContext, useState, useEffect,
} from 'react';

import { Button } from '../../../../ui/Button/Button';
import { showToast } from '../../../../helpers/showToast';
import { TodosApi } from '../../../../api/Todos';
import { TodoContext, changeTodo } from '../../../../context/TodoContext';
import { TodoType } from '../../../../types/TodoType';

interface ModalTemplate {
  todo: TodoType;
  closeModal: () => void;
}

export const ModalTemplate = ({ todo, closeModal }: ModalTemplate) => {
  const { dispatch } = useContext(TodoContext);
  const [inputValue] = useState(todo.title);

  const confirmEdit = async (todo: TodoType) => {
    try {
      if (inputValue) {
        await TodosApi.changeTodo({ ...todo, title: inputValue });
        dispatch(changeTodo({ ...todo, title: inputValue }));
      } else return;
    } catch (error) {
      console.log(error);
      showToast.showErrorToast('Ошибка при редактировании задачи!');
    }
    closeModal();
  };

  useEffect(() => {
    const keyEnter = (event: any) => {
      if (event.key === 'Enter' && inputValue) {
        confirmEdit({ ...todo, title: inputValue });
      }
    };

    document.addEventListener('keydown', keyEnter);

    return () => {
      document.removeEventListener('keydown', keyEnter);
    };
  }, [inputValue]);

  return (
    <div className="modal-template-container">
      <h2>Редактирование</h2>
      <div className="block-change-todo">
        <div className="modal-input">
        </div>
        <div className="container-btn">
          <Button
            size="large"
            color="basic"
            backgroung="primary"
            onClick={() => confirmEdit({ ...todo, title: inputValue })}
          >
            Подтвердить
          </Button>
          <Button
            size="medium"
            color="basic"
            backgroung="secondary"
            onClick={() => closeModal()}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};
