import React, { useEffect, useState } from "react";
import RecipeForm from "../props/FormRecipes";
import { GetRecipeById } from "../network/fetchApiServices"; 

const EditRecipePage = ({ recipeId }: { recipeId: string }) => {
  const [initialValues, setInitialValues] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await GetRecipeById(recipeId); 
        setInitialValues(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) return <p>Loading...</p>;

  return <RecipeForm mode="edit" recipeId={recipeId} initialValues={initialValues} />;
};

export default EditRecipePage;
