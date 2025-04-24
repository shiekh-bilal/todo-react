import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchTodos = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
  return data;
};

const TodoList = () => {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');

  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const addTodo = useMutation({
    mutationFn: async (title) => {
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleComplete = useMutation({
    mutationFn: async (todo) => {
      const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      console.log("data = ", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Something went wrong: {error.message}</p>;

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
          onClick={() => {
            if (!newTodo.trim()) return;
            addTodo.mutate(newTodo);
            setNewTodo('');
          }}
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
                onChange={() => toggleComplete.mutate(todo)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.title}</span>
            </div>
            <button onClick={() => deleteTodo.mutate(todo.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;