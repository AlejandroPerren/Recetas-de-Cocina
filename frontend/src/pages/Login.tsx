import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Login } from '../network/fetchApiServices';
import { useState } from 'react';


//Import Schema Yup
import { LoginSchema } from '../yupSchemas/Schemas';
import { ILogin } from '../models/AuthModel';

const LoginForm = () => {
  // React Hook Form Config
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const formData = watch();

  //Send of Form Config
  const onSubmit = async (auth: ILogin) => {
    try {
      setServerError(null); 
      await Login(auth); 
      alert("Inicio de sesión exitoso");
      reset(); 
    } catch (error: any) {
      setServerError(error.message);
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

}

export default LoginForm