import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/NoutFound';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

function TodoFeature(props) {
  // (VD Trong trang Todos sẽ có thêm trang list,detail (2 trang này chính là 2 trang con của trang Todos còn trang Todos là trang cha))
  // Nested routing => Lấy ra đường dẫn cha => Vd: đường dẫn cha là Todos thì match ở đây chính là Todos
  const match = useRouteMatch();

  // Xử lý với URL Params
  const location = useLocation();

  // Xử lý chuyển trang
  const history = useHistory();

  const initTodoList = [
    { id: 1, name: 'Do HomeWork',  status: 'new' },
    { id: 2, name: 'Do HouseWork', status: 'completed' },
    { id: 3, name: 'Go To School', status: 'new' },
  ];

  const [todoList, setTodoList] = useState(initTodoList);

  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search); // Lấy phần sau dấu ?
    return params.status || 'all';
  });

  const handleTodoClick = (index) => {
    // clone current array to the new one
    const newTodoList = [...todoList];
    // toggle state
    newTodoList[index] = {
      // clone current object to the new one
      ...newTodoList[index],
      // Chỉ thay đổi mỗi trạng thái còn lại giữ nguyên
      status: newTodoList[index].status === 'new' ? 'completed' : 'new',
    };
    // Update Todo List
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    // Cập nhật state
    // setFilteredStatus("all");

    // Cập nhật URL Params
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path, // Lấy ra đường dẫn hiện tại
      search: queryString.stringify(queryParams), // Thêm search vào đường dẫn đó
    });
  };

  const handleShowCompletedClick = () => {
    // setFilteredStatus("completed");

    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNewClick = () => {
    // setFilteredStatus("new");

    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  useEffect(() => {
    const params = queryString.parse(location.search); // Lấy phần sau dấu ?
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  // Khi và chỉ khi todoList hoặc filteredStatus thay đổi thì mới tính toán lại còn không cứ lấy giá trị hiện tại
  const renderTodoList = useMemo(() => {
    return todoList.filter((x) => filteredStatus === 'all' || filteredStatus === x.status);
  }, [todoList, filteredStatus]);

  const onHandleSubmitForm = (values) => {
    const newTodo = {
      id: todoList.length + 1,
      name: values.title,
      status: 'new',
    }
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  }

  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:todoId`} component={DetailPage} exact />

        <Route component={NotFound} />
      </Switch>

      <h3>Todo Form</h3>
      <TodoForm onSubmitForm={onHandleSubmitForm}/>

      <h3>Todo List</h3>
      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />

      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>
      </div>
    </div>
  );
}

export default TodoFeature;
