import React, { useCallback, useState } from 'react';
import { useTodos, useAddTodo, useDeleteTodo, useToggleTodoComplete } from '../hooks/todos';
import { Loading } from './Loading';
import { Error } from './Error';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const { data: todos, isLoading, error } = useTodos();
  console.log("todos = ", todos);
  const addTodoMutation = useAddTodo();
  const deleteTodoMutation = useDeleteTodo();
  const toggleTodoMutation = useToggleTodoComplete();

  
  const handleAddTodo = useCallback(() => {
    if (!newTodo.trim()) return;
    addTodoMutation.mutate(newTodo);
    setNewTodo('');
  }, [newTodo, addTodoMutation]);
  
  const handleToggleTodo = useCallback((todo) => {
    toggleTodoMutation.mutate(todo);
  }, [toggleTodoMutation]);
  
  const handleDeleteTodo = useCallback((id) => {
    deleteTodoMutation.mutate(id);
  }, [deleteTodoMutation]);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  
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
        {todos.todos?.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.todo}</span>
            </div>
            <button onClick={() => handleDeleteTodo(todo.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
