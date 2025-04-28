import React, { useState } from 'react';
import { useTodos, useAddTodo, useDeleteTodo, useToggleTodoComplete } from '../hooks/todos';
import { Loading } from './Loading';
import { Error } from './Error';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const { data: todos, isLoading, error } = useTodos();
  const addTodoMutation = useAddTodo();
  const deleteTodoMutation = useDeleteTodo();
  const toggleTodoMutation = useToggleTodoComplete();

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    addTodoMutation.mutate(newTodo);
    setNewTodo('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoMutation.mutate(todo)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.title}</span>
            </div>
            <button onClick={() => deleteTodoMutation.mutate(todo.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
