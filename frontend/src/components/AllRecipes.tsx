import { Container } from '@mui/material';
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
                setAllRecipes([]); // Asegura que sea un array vacío si hay un error.
            }
        };
        getRecipes();
    }, []);

    return (
        <Container>
            {serverError && <p>Error: {serverError}</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {allRecipes.length > 0 ? (
                    allRecipes.map((recipe) => (
                        <li key={recipe._id} style={{ marginBottom: '1rem' }}>
                            <RecipeReviewCard card={recipe} />
                        </li>
                    ))
                ) : (
                    <p>No hay recetas disponibles.</p>
                )}
            </ul>
        </Container>
    );
};

export default AllRecipes;
