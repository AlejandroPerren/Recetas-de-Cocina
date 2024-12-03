import { Container, Typography, TextField, Button, Box, IconButton } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newRecipeSchema } from "../yupSchemas/Schemas";
import { ICreateRecipe } from "../models/ServicesModel";
import { CreateNewRecipe } from "../network/fetchApiServices";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const FormRecipe = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ICreateRecipe>({
    resolver: yupResolver(newRecipeSchema),
    defaultValues: {
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

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (recipe: ICreateRecipe) => {
    try {
      setServerError(null);

      // Limpiar el objeto antes de enviarlo
      const sanitizedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.map(({ name, quantity }) => ({ name, quantity })),
        steps: recipe.steps.map(({ stepNumber, instruction }) => ({ stepNumber, instruction })),
      };

      await CreateNewRecipe(sanitizedRecipe);
      reset();
      alert("Receta creada exitosamente");
    } catch (error) {
      setServerError(`Error al crear la receta. Inténtalo de nuevo: ${error}`);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 3 }}>
        Crear Nueva Receta
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Título" variant="outlined" error={!!errors.title} helperText={errors.title?.message} fullWidth />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Descripción" variant="outlined" multiline rows={4} error={!!errors.description} helperText={errors.description?.message} fullWidth />
            )}
          />

          <Typography variant="h6">Ingredientes</Typography>
          {ingredientFields.map((item, index) => (
            <Box key={item.id} display="flex" gap={2}>
              <Controller
                name={`ingredients.${index}.name`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Nombre del Ingrediente" variant="outlined" error={!!errors.ingredients?.[index]?.name} helperText={errors.ingredients?.[index]?.name?.message} />
                )}
              />
              <Controller
                name={`ingredients.${index}.quantity`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Cantidad" variant="outlined" error={!!errors.ingredients?.[index]?.quantity} helperText={errors.ingredients?.[index]?.quantity?.message} />
                )}
              />
              <IconButton onClick={() => removeIngredient(index)} color="error">
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={() => addIngredient({ name: "", quantity: "" })} variant="outlined" startIcon={<AddIcon />}>
            Agregar Ingrediente
          </Button>

          <Typography variant="h6">Pasos</Typography>
          {stepFields.map((item, index) => (
            <Box key={item.id} display="flex" gap={2}>
              <Controller
                name={`steps.${index}.instruction`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={`Paso ${index + 1}`} variant="outlined" error={!!errors.steps?.[index]?.instruction} helperText={errors.steps?.[index]?.instruction?.message} fullWidth />
                )}
              />
              <IconButton onClick={() => removeStep(index)} color="error">
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={() => addStep({ stepNumber: stepFields.length + 1, instruction: "" })} variant="outlined" startIcon={<AddIcon />}>
            Agregar Paso
          </Button>

          <Controller
            name="cookingTime"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Tiempo de Cocción (minutos)" type="number" variant="outlined" error={!!errors.cookingTime} helperText={errors.cookingTime?.message} fullWidth />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Tipo de Receta" variant="outlined" error={!!errors.type} helperText={errors.type?.message} fullWidth />
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="URL de la Imagen" variant="outlined" error={!!errors.image} helperText={errors.image?.message} fullWidth />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Crear Receta
          </Button>
        </Box>
      </form>

      {serverError && (
        <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
          {serverError}
        </Typography>
      )}

      <Box marginTop={4}>
        <Typography variant="h6">Valores actuales del formulario:</Typography>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </Box>
    </Container>
  );
};

export default FormRecipe;
