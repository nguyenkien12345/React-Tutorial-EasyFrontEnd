import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function TodoList({ todoList, onTodoClick }) {
  const handleTodoClick = (index) => {
    if (onTodoClick) {
      onTodoClick(index); /*Truyền đi cái index của todo*/
    }
  };

  return (
    <ul className="todo-list">
      {todoList.map((todo, index) => (
        <li
          key={index}
          className={classnames({ 'todo-item': true, completed: todo.status === 'completed' })}
          onClick={() => handleTodoClick(index)} /*Lấy ra cái index của todo*/
        >
          {todo.name}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
