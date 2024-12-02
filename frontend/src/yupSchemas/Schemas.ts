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


  // Esquema para validar la creación de una nueva receta
export const newRecipeSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  ingredients: yup
      .array()
      .of(
          yup.object().shape({
              name: yup.string().required("Ingredient name is required"),
              quantity: yup.string().required("Ingredient quantity is required"),
          })
      )
      .min(1, "At least one ingredient is required")
      .required("Ingredients are required"),
  steps: yup
      .array()
      .of(
          yup.object().shape({
              stepNumber: yup
                  .number()
                  .min(1, "Step number must be at least 1")
                  .required("Step number is required"),
              instruction: yup
                  .string()
                  .required("Step instruction is required"),
          })
      )
      .min(1, "At least one step is required")
      .required("Steps are required"),
  cookingTime: yup
      .number()
      .min(1, "Cooking time must be at least 1 minute")
      .required("Cooking time is required"),
  type: yup.string().required("Type is required"),
  image: yup
      .string()
      .url("Image must be a valid URL")
      .required("Image is required"),
});
