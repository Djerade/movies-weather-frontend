'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Box, VStack, Field, Alert, Text, Link } from '@chakra-ui/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validationSchemas, formikConfig } from '@/lib/formik-config';

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Signup failed');
        }

        setSuccess(true);
        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (success) {
    return (
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <VStack gap={4}>
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Title>Account created successfully!</Alert.Title>
            <Alert.Description>
              You will be redirected to the login page shortly.
            </Alert.Description>
          </Alert.Root>
        </VStack>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <form onSubmit={formik.handleSubmit}>
        <VStack gap={4}>
          {error && (
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}

          <Field.Root invalid={!!(formik.errors.name && formik.touched.name)}>
            <Field.Label>Full Name</Field.Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your full name"
            />
            <Field.ErrorText>{formik.errors.name}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!(formik.errors.email && formik.touched.email)}>
            <Field.Label>Email</Field.Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />
            <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            invalid={!!(formik.errors.password && formik.touched.password)}
          >
            <Field.Label>Password</Field.Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
            />
            <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            invalid={!!(formik.errors.confirmPassword && formik.touched.confirmPassword)}
          >
            <Field.Label>Confirm Password</Field.Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm your password"
            />
            <Field.ErrorText>{formik.errors.confirmPassword}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            loading={isLoading}
            loadingText="Creating account..."
          >
            Create Account
          </Button>

          <Text fontSize="sm" textAlign="center">
            Already have an account?{' '}
            <Link href="/login" color="blue.500" textDecoration="underline">
              Sign in
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}
