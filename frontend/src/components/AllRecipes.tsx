import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { GetAllRecipes, GetRecipesByUserId } from '../network/fetchApiServices';
import { IRecipes } from '../models/ServicesModel';
import RecipeReviewCard from '../props/RecipeReviewCard';
import RecipeFilter from '../utils/Filter';
import { useLocation } from 'react-router-dom';  

const AllRecipes = () => {
  const location = useLocation();  
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');  
  
  const [serverError, setServerError] = useState<string | null>(null);
  const [allRecipes, setAllRecipes] = useState<IRecipes[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipes[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setServerError(null);
        let recipes;

        if (userId) {
          recipes = await GetRecipesByUserId(userId);  
        } else {
          recipes = await GetAllRecipes();  
        }

        setAllRecipes(recipes);
        setFilteredRecipes(recipes);
      } catch (error: any) {
        setServerError(error.message);
        setAllRecipes([]);
        setFilteredRecipes([]);
      }
    };

    getRecipes();
  }, [userId]);  

  return (
    <Container>
      <RecipeFilter allRecipes={allRecipes} setFilteredRecipes={setFilteredRecipes} />
      {serverError && (
        <Typography color="error" variant="h6" align="center" gutterBottom>
          Error: {serverError}
        </Typography>
      )}
      {filteredRecipes.length > 0 ? (
        <Grid container spacing={4}>
          {filteredRecipes.map((recipe) => (
            <Grid item key={recipe._id} xs={12} sm={6} md={4}>
              <RecipeReviewCard card={recipe} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" gutterBottom>
          No hay recetas disponibles.
        </Typography>
      )}
    </Container>
  );
};

export default AllRecipes;
