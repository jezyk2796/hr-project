import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import { axiosClient } from '../../api/apiClient';

import * as styles from './SignUp.styles';

const schema = z
  .object({
    firstName: z
      .string({ required_error: 'Please fulfill marked fields' })
      .min(3, { message: 'Minimum length is 3' })
      .max(15, { message: 'Maximum length is 15' }),
    lastName: z
      .string()
      .min(3, { message: 'Minimum length is 3' })
      .max(15, { message: 'Maximum length is 15' }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: 'Minimum length is 5' })
      .max(15, { message: 'Maximum length is 15' }),
    retypedPassword: z
      .string()
      .min(5, { message: 'Minimum length is 5' })
      .max(15, { message: 'Maximum length is 15' }),
  })
  .refine((data) => data.password === data.retypedPassword, {
    message: 'The passwords do not match',
    path: ['retypedPassword'],
  });

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignupFormValue = z.infer<typeof schema>;

export const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<SignupFormValue>({
    resolver: zodResolver(schema),
  });

  const createUserRequest = async (payload: RegisterPayload) => {
    try {
      await axiosClient.post('/auth/register', {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      });

      toast.success(
        'User has been created. Now you can log in to the service.',
      );

      navigate('/signin');
    } catch (error) {
      toast.error('Error! Something went wrong.');
    }
  };

  const onSubmit = (data: SignupFormValue) => {
    createUserRequest(data);
  };

  return (
    <Box sx={styles.mainContainer}>
      <Helmet>
        <title>HR Dashboard - Sign Up</title>
      </Helmet>
      <Paper sx={styles.paperContainer}>
        <Typography variant="h1" sx={styles.header}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styles.formContainer}>
            <TextField
              placeholder="First Name *"
              variant="standard"
              helperText={formState.errors.firstName?.message?.toString()}
              error={formState.errors.firstName && true}
              sx={{ mt: 3 }}
              {...register('firstName')}
            />
            <TextField
              placeholder="Last Name *"
              variant="standard"
              helperText={formState.errors.lastName?.message?.toString()}
              error={formState.errors.lastName && true}
              sx={{ mt: 3 }}
              {...register('lastName')}
            />
            <TextField
              placeholder="Email *"
              variant="standard"
              helperText={formState.errors.email?.message?.toString()}
              error={formState.errors.email && true}
              sx={{ mt: 3 }}
              {...register('email')}
            />
            <TextField
              placeholder="Password *"
              type="password"
              variant="standard"
              helperText={formState.errors.password?.message?.toString()}
              error={formState.errors.password && true}
              sx={{ mt: 3 }}
              {...register('password')}
            />
            <TextField
              placeholder="Retype Password *"
              type="password"
              variant="standard"
              helperText={formState.errors.retypedPassword?.message?.toString()}
              error={formState.errors.retypedPassword && true}
              sx={{ mt: 3 }}
              {...register('retypedPassword')}
            />
            <Box sx={{ display: 'flex' }}>
              <Button type="submit" variant="contained" sx={{ mt: 5 }}>
                Sign Up
              </Button>
            </Box>
            <Typography variant="caption" sx={{ mt: 2 }}>
              Already have an account? Then
              <Link href="/signin" underline="none">
                &nbsp;Sign In
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
