import axios from 'axios';

const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async () => {
  const { data } = await axios.get(`${TODOS_API_URL}?_limit=10`);
  return data;
};

export const addTodo = async (title) => {
  console.log("title = ", title)
  const { data } = await axios.post(TODOS_API_URL, {
    title,
    completed: false,
  });
  return data;
};

export const deleteTodo = async (id) => {
  console.log("id = ", id)
  await axios.delete(`${TODOS_API_URL}/${id}`);
  return id;
};

export const toggleTodoComplete = async (todo) => {
  console.log("todo = ", todo);
  const { data } = await axios.put(`${TODOS_API_URL}/${todo.id}`, {
    ...todo,
    completed: !todo.completed,
  });
  return data;
};
