'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Field, Alert } from '@chakra-ui/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validationSchemas, formikConfig } from '@/lib/formik-config';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const formik = useFormik<LoginFormValues>({
    ...formikConfig,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemas.email.concat(
      validationSchemas.password
    ),
    onSubmit: async values => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          setError('Invalid email or password');
        } else {
          router.push('/dashboard');
        }
      } catch {
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

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

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            loading={isLoading}
            loadingText="Signing in..."
          >
            Sign In
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
