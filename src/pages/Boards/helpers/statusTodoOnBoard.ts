interface TypeStatusTodoOnBoard {
  id: number;
  type: string;
}

export const statusTodoOnBoard: TypeStatusTodoOnBoard[] = [
  {
    id: 1,
    type: 'Запланированно',
  },
  {
    id: 2,
    type: 'В процессе',
  },
  {
    id: 3,
    type: 'Выполненно',
  },
];
