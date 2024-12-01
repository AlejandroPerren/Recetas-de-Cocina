import * as yup from 'yup';

// Yup Validation
export const SignUpSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup
      .string()
      .email('Debe ser un correo válido')
      .required('El correo es obligatorio'),
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  });

  export const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Debe ser un correo válido')
      .required('El correo es obligatorio'),
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  });