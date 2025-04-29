import { useQuery } from '@tanstack/react-query';
import { fetchRecipes, addRecipe, deleteRecipe, toggleTodoComplete } from '../services/todosService';
import { QUERY_KEYS } from '../constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRecipes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.RECIPES],
    queryFn: fetchRecipes,
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

export const useAddRecipe = () => createMutation((recipe) => addRecipe(recipe));
export const useDeleteRecipe = () => createMutation((id) => deleteRecipe(id));
export const useToggleTodoComplete = () => createMutation((id) => toggleTodoComplete(id));