"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formikConfig, validationSchemas } from "@/lib/formik-config";
import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const formik = useFormik<SignupFormValues>({
    ...formikConfig,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemas.name
      .concat(validationSchemas.email)
      .concat(validationSchemas.password)
      .concat(validationSchemas.confirmPassword),
    onSubmit: async values => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Replace with actual signup API call
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Signup failed");
        }

        setSuccess(true);
        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (success) {
    return (
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <VStack gap={4}>
          <Box
            p={4}
            bg="green.50"
            border="1px"
            borderColor="green.200"
            borderRadius="md"
            color="green.800"
          >
            <Text fontWeight="bold">Account created successfully!</Text>
            <Text fontSize="sm" mt={1}>
              You will be redirected to the login page shortly.
            </Text>
          </Box>
        </VStack>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <form onSubmit={formik.handleSubmit}>
        <VStack gap={4}>
          {error && (
            <Box
              p={3}
              bg="red.50"
              border="1px"
              borderColor="red.200"
              borderRadius="md"
              color="red.800"
            >
              {error}
            </Box>
          )}

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Full Name
            </Text>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your full name"
              borderColor={
                formik.errors.name && formik.touched.name
                  ? "red.500"
                  : undefined
              }
            />
            {formik.errors.name && formik.touched.name && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {formik.errors.name}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Email
            </Text>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              borderColor={
                formik.errors.email && formik.touched.email
                  ? "red.500"
                  : undefined
              }
            />
            {formik.errors.email && formik.touched.email && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {formik.errors.email}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Password
            </Text>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              borderColor={
                formik.errors.password && formik.touched.password
                  ? "red.500"
                  : undefined
              }
            />
            {formik.errors.password && formik.touched.password && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {formik.errors.password}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Confirm Password
            </Text>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm your password"
              borderColor={
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "red.500"
                  : undefined
              }
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formik.errors.confirmPassword}
                </Text>
              )}
          </Box>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <Text fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <Link href="/login" color="blue.500" textDecoration="underline">
              Sign in
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}
