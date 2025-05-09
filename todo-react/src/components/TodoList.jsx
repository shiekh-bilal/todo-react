import React, { useCallback, useState } from 'react';
import { useRecipes, useAddRecipe, useDeleteRecipe, useToggleTodoComplete } from '../hooks/todos';
import { Loading } from './Loading';
import { Error } from './Error';
import "../App.css"

const TodoList = () => {
  const [newRecipe, setNewRecipe] = useState('');

  const { data: recipes, isLoading, error } = useRecipes();
  console.log("recipes = ", recipes);
  const addRecipeMutation = useAddRecipe();
  const deleteRecipeMutation = useDeleteRecipe();
  const toggleTodoMutation = useToggleTodoComplete();

  
  const handleAddRecipe = useCallback(() => {
    if (!newRecipe.trim()) return;
    addRecipeMutation.mutate(newRecipe);
    setNewRecipe('');
  }, [newRecipe, addRecipeMutation]);
  
  // const handleToggleTodo = useCallback((todo) => {
  //   toggleTodoMutation.mutate(todo);
  // }, [toggleTodoMutation]);
  
  const handleDeleteRecipe = useCallback((id) => {
    deleteRecipeMutation.mutate(id);
  }, [deleteRecipeMutation]);

  // if (isLoading) return <Loading />;
  // if (error) return <Error error={error} />;
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add a New Recipe</h2>
        <div className="flex gap-3">
          <input
            className="flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 rounded-lg text-gray-800 shadow-sm"
            value={newRecipe}
            data-testid="new-recipe-input"
            onChange={(e) => setNewRecipe(e.target.value)}
            placeholder="Enter recipe name"
          />
          <button
            onClick={handleAddRecipe}
            data-testid="add-recipe-button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h1 data-testid="recipe-list-heading" className="text-3xl font-bold text-gray-900">Recipe List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.recipes?.map((recipe) => (
            <div
              key={recipe.id}
              data-testid="recipe-card"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{recipe.name}</h2>
                  <p className="text-sm text-gray-500 mb-1">{recipe.cuisine} • {recipe.mealType.join(', ')}</p>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>🕒 Prep: {recipe.prepTimeMinutes} min</p>
                  <p>🔥 Cook: {recipe.cookTimeMinutes} min</p>
                  <p>🍽️ Servings: {recipe.servings}</p>
                  <p>🎯 Difficulty: {recipe.difficulty}</p>
                  <p>⚡ Calories: {recipe.caloriesPerServing} kcal</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-yellow-500 font-semibold text-sm">
                    ⭐ {recipe.rating} <span className="text-gray-500">({recipe.reviewCount})</span>
                  </div>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    data-testid="add-recipe-button"
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TodoList;
