import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ICreateRecipe } from "../models/ServicesModel";
import { newRecipeSchema } from "../yupSchemas/Schemas";
import { CreateNewRecipe, UpdateRecipe } from "../network/fetchApiServices";

interface RecipeFormProps {
  mode: "create" | "edit";
  recipeId?: string;
  initialValues?: ICreateRecipe;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ mode, recipeId, initialValues }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateRecipe>({
    resolver: yupResolver(newRecipeSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
      ingredients: [{ name: "", quantity: "" }],
      steps: [{ stepNumber: 1, instruction: "" }],
      cookingTime: 0,
      type: "",
      image: "",
    },
  });

  const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { fields: stepFields, append: addStep, remove: removeStep } = useFieldArray({
    control,
    name: "steps",
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  const onSubmit = async (data: ICreateRecipe) => {
    try {
      setServerError(null);
      if (mode === "create") {
        await CreateNewRecipe(data);
        alert("Recipe created successfully");
      } else if (mode === "edit" && recipeId) {
        await UpdateRecipe(data, recipeId);
        alert("Recipe updated successfully");
      }
      reset();
    } catch (error) {
      setServerError(`Error: ${error}`);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 3 }}>
        {mode === "create" ? "Create New Recipe" : "Edit Recipe"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Ingredients</Typography>
            {ingredientFields.map((item, index) => (
              <Box key={item.id} display="flex" gap={1} alignItems="center">
                <Controller
                  name={`ingredients.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Name" variant="outlined" error={!!errors.ingredients?.[index]?.name} helperText={errors.ingredients?.[index]?.name?.message} />
                  )}
                />
                <Controller
                  name={`ingredients.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Quantity" variant="outlined" error={!!errors.ingredients?.[index]?.quantity} helperText={errors.ingredients?.[index]?.quantity?.message} />
                  )}
                />
                <IconButton onClick={() => removeIngredient(index)} color="error">
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={() => addIngredient({ name: "", quantity: "" })} variant="outlined" startIcon={<AddIcon />}>
              Add Ingredient
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Title" variant="outlined" error={!!errors.title} helperText={errors.title?.message} fullWidth />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Description" variant="outlined" multiline rows={4} error={!!errors.description} helperText={errors.description?.message} fullWidth />
              )}
            />
            <Controller
              name="cookingTime"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Cooking Time (min)" type="number" variant="outlined" error={!!errors.cookingTime} helperText={errors.cookingTime?.message} fullWidth />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Type" variant="outlined" error={!!errors.type} helperText={errors.type?.message} fullWidth />
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Image URL" variant="outlined" error={!!errors.image} helperText={errors.image?.message} fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6">Steps</Typography>
            {stepFields.map((item, index) => (
              <Box key={item.id} display="flex" gap={2} alignItems="center">
                <Controller
                  name={`steps.${index}.instruction`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label={`Step ${index + 1}`} variant="outlined" error={!!errors.steps?.[index]?.instruction} helperText={errors.steps?.[index]?.instruction?.message} fullWidth />
                  )}
                />
                <IconButton onClick={() => removeStep(index)} color="error">
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={() => addStep({ stepNumber: stepFields.length + 1, instruction: "" })} variant="outlined" startIcon={<AddIcon />}>
              Add Step
            </Button>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button type="submit" variant="contained" color="primary">
            {mode === "create" ? "Create Recipe" : "Update Recipe"}
          </Button>
        </Box>
        {serverError && (
          <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
            {serverError}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default RecipeForm;
