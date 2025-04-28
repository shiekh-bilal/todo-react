import { useQuery } from '@tanstack/react-query';
import { fetchTodos, addTodo, deleteTodo, toggleTodoComplete } from '../services/todosService';
import { QUERY_KEYS } from '../constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodos = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchTodos,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    // },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    // },
  });
};

export const useToggleTodoComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodoComplete,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    // },
  });
};
