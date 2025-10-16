import * as Yup from "yup";

// Common validation schemas
export const validationSchemas = {
  email: Yup.string()
    .email("Adresse email invalide")
    .required("L'email est requis"),

  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),

  name: Yup.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Le nom est requis"),

  city: Yup.string()
    .min(2, "La ville doit contenir au moins 2 caractères")
    .required("La ville est requise"),
};

// Login form schema
export const loginSchema = Yup.object({
  email: validationSchemas.email,
  password: validationSchemas.password,
});

// Signup form schema
export const signupSchema = Yup.object({
  name: validationSchemas.name,
  email: validationSchemas.email,
  password: validationSchemas.password,
  confirmPassword: validationSchemas.confirmPassword,
  city: validationSchemas.city,
});

// Common form configurations
export const formikConfig = {
  validateOnChange: true,
  validateOnBlur: true,
  enableReinitialize: true,
};

// Common form field props
export const fieldProps = {
  variant: "filled" as const,
  size: "md" as const,
};
