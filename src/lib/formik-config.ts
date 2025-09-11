import * as Yup from "yup";

// Common validation schemas
export const validationSchemas = {
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
};

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
