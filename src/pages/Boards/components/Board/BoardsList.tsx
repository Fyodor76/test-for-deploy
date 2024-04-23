import { useContext } from 'react';

import { TransitionGroup } from 'react-transition-group';

import { CSSTransition } from 'react-transition-group';

import { useRef } from 'react';

import { BoardContext, deleteBoard } from '../../../../context/BoardContext';
import { AddTodo } from '../AddTodo/AddTodo';
import { Button } from '../../../../ui/Button/Button';
import { AddBoard } from '../AddBoard/AddBoard';
import { BoardsApi } from '../../../../api/Boards';
import { formatTimeStamp } from '../../../../helpers/formatTimeStamp';

import { showToast } from '../../../../helpers/showToast';

import { statusTodoOnBoard } from '../../helpers/statusTodoOnBoard';

import { TodosOnBoard } from './TodosOnBoard/TodosOnBoard';


export const BoardsList = () => {
  const { state: boardState, dispatch } = useContext(BoardContext);
  const nodeRef = useRef(null);


  const handleDeleteBoard = async (id: number | string) => {
    try {
      await BoardsApi.deleteBoard(id);
      dispatch(deleteBoard(id));
    } catch (error) {
      console.error('Ошибка при удалении доски', error);
      showToast.showErrorToast('Ошибка при удалении!');
    }
  };

  return (
    <div className="boards-list">
      <AddBoard />
      <TransitionGroup>
        {boardState.boards?.map((item) => (
          <CSSTransition
            nodeRef={nodeRef}
            key={item.id}
            timeout={300}
            classNames="board"
            unmountOnExit
          >
            <div ref={nodeRef} key={item.id} className="board">
              <div>{formatTimeStamp(item?.date)}</div>
              <div>
                <h2>{item.boardName}</h2>
              </div>
              <div className="container-blocks">
                {statusTodoOnBoard.map((elem) => (
                  <TodosOnBoard
                    key={elem.id}
                    type={elem.type}
                    item={item}
                  ></TodosOnBoard>
                ))}
              </div>
              <div>
                <AddTodo boardId={item?.id || ''} />
              </div>
              <div className="container-btn-del-board">
                <Button
                  size="large"
                  background="transparent"
                  color="accent"
                  onClick={() => handleDeleteBoard(item.id || '')}
                >
                  Удалить доску
                </Button>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
