"use client";

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <ChakraInput ref={ref} {...props} />;
  }
);

Input.displayName = "Input";
