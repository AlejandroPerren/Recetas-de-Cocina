import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";
import { GetUserById, GetRecipesByUserId } from "../network/fetchApiServices";
import RecipeReviewCard from "../props/RecipeReviewCard";

const UserData = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [userData, setUserData] = useState<any>(null);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setServerError(null);

        if (userId) {
          const userResponse = await GetUserById(userId);
          setUserData(userResponse.data);
          const recipes = await GetRecipesByUserId(userId);
          setUserRecipes(recipes);
        }
      } catch (error: any) {
        setServerError(error.message);
        setUserData(null);
        setUserRecipes([]);
      }
    };

    fetchUserData();
  }, [userId]);

  if (serverError) {
    return (
      <Typography color="error" variant="h6" align="center" gutterBottom>
        Error: {serverError}
      </Typography>
    );
  }

  return (
    <Container>
      {userData ? (
        <>
          <Typography variant="h4" gutterBottom>
            {userData.name}'s Profile
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {userData.email}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Favoritos:
          </Typography>
          <Grid container spacing={4}>
            {userData.favorites.length > 0 ? (
              userData.favorites.map((favorite: any, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <RecipeReviewCard card={favorite} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No tienes recetas favoritas.</Typography>
            )}
          </Grid>
          <Typography variant="h5" gutterBottom>
            Mis Recetas:
          </Typography>
          <Grid container spacing={4}>
            {userRecipes.length > 0 ? (
              userRecipes.map((recipe) => (
                <Grid item key={recipe._id} xs={12} sm={6} md={4}>
                  <RecipeReviewCard card={recipe} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No tienes recetas asociadas.</Typography>
            )}
          </Grid>
        </>
      ) : (
        <Typography variant="h6" align="center" gutterBottom>
          Cargando datos del usuario...
        </Typography>
      )}
    </Container>
  );
};

export default UserData;
