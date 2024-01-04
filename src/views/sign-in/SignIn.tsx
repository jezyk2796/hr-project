import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import { tokenStorage } from '../../utils/TokenStorage';
import { loginRequest } from '../../api/login';

import * as styles from './SignIn.styles';

const schema = z.object({
  login: z.string().email(),
  password: z
    .string()
    .min(5, { message: 'Minimum length is 5' })
    .max(15, { message: 'Maximum length is 15' }),
  rememberUser: z.boolean(),
});

type SignInFormValue = z.infer<typeof schema>;

export const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<SignInFormValue>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useMutation(loginRequest, {
    onSuccess: (token, payload) => {
      tokenStorage.set(token, payload.rememberUser);
      toast.success('Logged in ;) Welcome!');
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Wrong email or password. Try again.');
    },
  });

  const sendLoginRequest = async (data: SignInFormValue) => {
    mutate({
      login: data.login,
      password: data.password,
      rememberUser: data.rememberUser,
    });
  };

  return (
    <Box sx={styles.mainContainer}>
      <Helmet>
        <title>HR Dashboard - Sign In</title>
      </Helmet>
      <Paper sx={styles.paperContainer}>
        <Typography variant="h1" sx={styles.header}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(sendLoginRequest)}>
          <Box sx={styles.formContainer}>
            <TextField
              placeholder="Email *"
              variant="standard"
              sx={{ mt: 3 }}
              helperText={formState.errors.login?.message?.toString()}
              error={formState.errors.login && true}
              {...register('login')}
            />
            <TextField
              placeholder="Password *"
              type="password"
              variant="standard"
              sx={{ mt: 3 }}
              helperText={formState.errors.password?.message?.toString()}
              error={formState.errors.password && true}
              {...register('password')}
            />
            <FormControlLabel
              control={<Checkbox {...register('rememberUser')} />}
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Box sx={{ display: 'flex' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </Box>
            <Typography variant="caption" sx={{ mt: 2 }}>
              Don&apos;t have an account?
              <Link href="/signup" underline="none">
                &nbsp;Click here to create one
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
