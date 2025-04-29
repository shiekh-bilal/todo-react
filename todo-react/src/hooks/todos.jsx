import { useQuery } from '@tanstack/react-query';
import { fetchTodos, addTodo, deleteTodo, toggleTodoComplete } from '../services/todosService';
import { QUERY_KEYS } from '../constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodos = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchTodos,
    staleTime: 5000,
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Generic mutation creator
export const createMutation = (mutationFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    // },
  });
};

export const useAddTodo = () => createMutation((todo) => addTodo(todo));
export const useDeleteTodo = () => createMutation((id) => deleteTodo(id));
export const useToggleTodoComplete = () => createMutation((id) => toggleTodoComplete(id));