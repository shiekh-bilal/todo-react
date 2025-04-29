import axios from 'axios';

const RECIPES_API_URL = 'https://dummyjson.com/recipes';

export const fetchRecipes = async () => {
  const { data } = await axios.get(`${RECIPES_API_URL}?_limit=10`);
  return data;
};

export const addRecipe = async (name) => {
  console.log("name = ", name);
  const { data } = await axios.post(`${RECIPES_API_URL}/add`, {
    name,
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh mozzarella cheese",
      "Fresh basil leaves",
      "Olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat the oven to 475°F (245°C).",
      "Roll out the pizza dough and spread tomato sauce evenly.",
      "Top with slices of fresh mozzarella and fresh basil leaves.",
      "Drizzle with olive oil and season with salt and pepper.",
      "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
      "Slice and serve hot."
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Easy",
    cuisine: "Italian",
    caloriesPerServing: 300,
    tags: [
      "Pizza",
      "Italian"
    ],
    userId: 45,
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    rating: 4.6,
    reviewCount: 3,
    mealType: [
      "Dinner"
    ]
  });
  console.log("data = ", data);
  return data;
};

export const deleteRecipe = async (id) => {
  console.log("id = ", id);
  await axios.delete(`${RECIPES_API_URL}/${id}`);
  return id;
};

export const toggleTodoComplete = async (todo) => {
  console.log("todo = ", todo);
  const { data } = await axios.put(`${RECIPES_API_URL}/${todo.id}`, {
    completed: !todo.completed,
  });
  return data;
};
