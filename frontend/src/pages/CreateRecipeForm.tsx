import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISignUp } from '../models/AuthModel';
import { CreateNewRecipe, SignUp } from '../network/fetchApiServices';
import { useState } from 'react';


//Import Schema
import { newRecipeSchema } from '../yupSchemas/Schemas';
import { IRecipes } from '../models/ServicesModel';
const FormRecipe = () => {
  // React Hook Form Config
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch, 
  } = useForm({
    resolver: yupResolver(newRecipeSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const formData = watch(); 

 
  const onSubmit = async (recipe: IRecipes) => {
    try {
      setServerError(null); 
      await CreateNewRecipe(recipe); 
      reset(); 
      alert("Inicio de sesión exitoso");
    } catch (error) {
      setServerError(`Ocurrió un error al Crear una Receta. Inténtalo de nuevo: ${error}` );
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 3 }}>
        Regístrate con Nosotros
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3}>
  
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Box>
                <TextField
                  {...field}
                  label="Nombre"
                  variant="outlined"
                  error={!!errors.name}
                  fullWidth
                />
                <Typography color="error" variant="body2">
                  {errors.name?.message}
                </Typography>
              </Box>
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Box>
                <TextField
                  {...field}
                  label="Correo Electrónico"
                  type="email"
                  variant="outlined"
                  error={!!errors.email}
                  fullWidth
                />
                <Typography color="error" variant="body2">
                  {errors.email?.message}
                </Typography>
              </Box>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Box>
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  error={!!errors.password}
                  fullWidth
                />
                <Typography color="error" variant="body2">
                  {errors.password?.message}
                </Typography>
              </Box>
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Registrarse
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
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </Box>
    </Container>
  );
};

export default FormRecipe;
