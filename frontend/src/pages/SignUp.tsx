import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISignUp } from '../models/AuthModel';

import { SignUp } from '../network/fetchApiServices';

// Yup Validation
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  email: yup
    .string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});


const SignUpForm = () => {

  // React Hook Form Config
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data: ISignUp) => {
    await SignUp(data)
    console.log('Datos del formulario:', data);
    
    reset(); 
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 3 }}>
        Regístrate con Nosotros
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3}>
         
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                variant="outlined"
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo Electrónico"
                type="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SignUpForm;
