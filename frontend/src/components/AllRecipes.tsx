import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GetAllRecipes } from '../network/fetchApiServices';
import { IRecipes } from '../models/ServicesModel';
import RecipeReviewCard from '../props/RecipeReviewCard';

const AllRecipes = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [allRecipes, setAllRecipes] = useState<IRecipes[]>([]);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                setServerError(null);
                const recipes = await GetAllRecipes();
                setAllRecipes(recipes);
            } catch (error: any) {
                setServerError(error.message);
                setAllRecipes([]);
            }
        };
        getRecipes();
    }, []);

    return (
        <Container>
            {serverError && (
                <Typography color="error" variant="h6" align="center" gutterBottom>
                    Error: {serverError}
                </Typography>
            )}
            {allRecipes.length > 0 ? (
                <Grid container spacing={4}>
                    {allRecipes.map((recipe) => (
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
