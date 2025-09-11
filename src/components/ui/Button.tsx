"use client";

import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export interface ButtonProps extends ChakraButtonProps {
  variant?: "solid" | "outline" | "subtle" | "surface" | "ghost" | "plain";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "solid",
      size = "md",
      loading,
      loadingText,
      ...props
    },
    ref
  ) => {
    return (
      <ChakraButton
        ref={ref}
        variant={variant}
        size={size}
        loading={loading}
        loadingText={loadingText}
        {...props}
      >
        {children}
      </ChakraButton>
    );
  }
);

Button.displayName = "Button";
