import { useContext } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

import { useRef } from 'react';

import { TodoContext } from '../../../../../context/TodoContext';
import { filterTodosByType } from '../../../helpers/filterTodosByType';
import { Todo } from '../Todo/Todo';
import { BoardType } from '../../../../../types/BoardType';


interface TypeTodoOnBoardProps {
    type: string,
    item: BoardType
}

export const TodosOnBoard = ({ type, item }: TypeTodoOnBoardProps) => {
  const { state: todoState } = useContext(TodoContext);
  const nodeRef = useRef(null);

  return (
    <div className="block-todos-onBoard">
      <h3>{type} :</h3>
      <TransitionGroup>
        {filterTodosByType(
          todoState.todos,
          item?.id || '',
          type, 
        ).map((todo) => (
          <CSSTransition
            key={todo.id}
            timeout={250}
            classNames="todo"
            nodeRef={nodeRef}
          >
            <div ref={nodeRef} key={todo.id}>
              <Todo todo={todo} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};