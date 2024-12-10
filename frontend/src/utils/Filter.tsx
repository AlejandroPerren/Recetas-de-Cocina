import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface RecipeFilterProps {
    allRecipes: IRecipes[];
    setFilteredRecipes: React.Dispatch<React.SetStateAction<IRecipes[]>>;
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ allRecipes, setFilteredRecipes }) => {
    const [filter, setFilter] = useState<string>('');

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const applyFilter = () => {
        const filtered = allRecipes.filter((recipe) =>
            recipe.ingredients.some((ingredient) =>
                ingredient.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
        setFilteredRecipes(filtered);
    };

    const resetFilter = () => {
        setFilter('');
        setFilteredRecipes(allRecipes);
    };

    return (
        <Container sx={{ mb: 4 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Filtrar Recetas por Ingredientes
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
                <TextField
                    label="Ingrediente"
                    value={filter}
                    onChange={handleFilterChange}
                    variant="outlined"
                />
                <Button variant="contained" onClick={applyFilter}>
                    Filtrar
                </Button>
                <Button variant="outlined" onClick={resetFilter}>
                    Resetear
                </Button>
            </Box>
        </Container>
    );
};

export default RecipeFilter;
