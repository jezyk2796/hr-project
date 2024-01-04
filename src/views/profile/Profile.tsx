import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Layout } from '../../components/layout/Layout';
import { useUserQuery } from '../../queries/useUserQuery';
import { tokenStorage } from '../../utils/TokenStorage';
import { AppRoute } from '../../AppRoute';
import { changePasswordRequest } from '../../api/changePassword';
import { changePersonalDataRequest } from '../../api/changePersonalData';

import * as styles from './Profile.styles';

const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(5, { message: 'Minimum length is 5' })
      .max(15, { message: 'Maximum length is 15' }),
    newPassword: z
      .string()
      .min(5, { message: 'Minimum length is 5' })
      .max(15, { message: 'Maximum length is 15' }),
    retypedPassword: z
      .string()
      .min(5, { message: 'Minimum length is 5' })
      .max(15, { message: 'Maximum length is 15' }),
  })
  .refine((data) => data.newPassword === data.retypedPassword, {
    message: 'The passwords do not match',
    path: ['retypedPassword'],
  });

const personalDataSchema = z.object({
  firstName: z
    .string({ required_error: 'Please fulfill marked fields' })
    .min(3, { message: 'Minimum length is 3' })
    .max(15, { message: 'Maximum length is 15' }),
  lastName: z
    .string()
    .min(3, { message: 'Minimum length is 3' })
    .max(15, { message: 'Maximum length is 15' }),
});

type PasswordFormValue = z.infer<typeof passwordSchema>;
type PersonalDataFormValue = z.infer<typeof personalDataSchema>;

const EMPTY_PASSWORD_FORM: PasswordFormValue = {
  oldPassword: '',
  newPassword: '',
  retypedPassword: '',
};

const EMPTY_PERSONAL_DATA_FORM: PersonalDataFormValue = {
  firstName: '',
  lastName: '',
};

export const Profile = () => {
  const navigate = useNavigate();
  const { data: userData, refetch: refetchUser } = useUserQuery();

  const passwordFormMethods = useForm<PasswordFormValue>({
    resolver: zodResolver(passwordSchema),
    defaultValues: EMPTY_PASSWORD_FORM,
  });
  const personalDataFormMethods = useForm<PersonalDataFormValue>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: EMPTY_PERSONAL_DATA_FORM,
  });

  const clearPasswordForm = () => {
    passwordFormMethods.reset();
  };

  const changePasswordMutation = useMutation(changePasswordRequest, {
    onSuccess: () => {
      tokenStorage.clear();
      toast.success(
        'Password has been changed. Log in again with a new password.',
      );
      navigate(AppRoute.signIn);
    },
    onError: () => {
      toast.error('Check if you entered the passwords correctly');
    },
  });

  const onChangePasswordSubmit = (data: PasswordFormValue) => {
    changePasswordMutation.mutate({
      oldPassword: data.oldPassword,
      retypedPassword: data.retypedPassword,
    });
  };

  const clearPersonalDataForm = () => {
    personalDataFormMethods.reset(EMPTY_PERSONAL_DATA_FORM);
  };

  const changePersonalDataMutation = useMutation(changePersonalDataRequest, {
    onSuccess: () => {
      refetchUser();
      clearPersonalDataForm();
      toast.success('Personal data has been changed.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onChangePersonalDataSubmit = (data: PersonalDataFormValue) => {
    changePersonalDataMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>HR Dashboard - Profile</title>
      </Helmet>
      <Box>
        <Container>
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
          <Typography variant="subtitle1">
            <b>Your name:</b> {userData ? userData.firstName : '--'}
          </Typography>
          <Typography variant="subtitle1">
            <b>Your last name:</b> {userData ? userData.lastName : '--'}
          </Typography>
          <Typography variant="subtitle1">
            <b>Your email:</b> {userData ? userData.email : '--'}
          </Typography>
        </Container>
        <Paper sx={styles.formContainer}>
          <Typography variant="h6">Change password</Typography>
          <form
            onSubmit={passwordFormMethods.handleSubmit(onChangePasswordSubmit)}
          >
            <Box sx={styles.formBox}>
              <FormControlLabel
                control={
                  <TextField
                    placeholder="Current password *"
                    type="password"
                    variant="standard"
                    helperText={passwordFormMethods.formState.errors.oldPassword?.message?.toString()}
                    error={
                      passwordFormMethods.formState.errors.oldPassword && true
                    }
                    {...passwordFormMethods.register('oldPassword')}
                  />
                }
                label="Current password:"
                sx={styles.formControl}
              />
              <FormControlLabel
                control={
                  <TextField
                    placeholder="New password *"
                    type="password"
                    variant="standard"
                    helperText={passwordFormMethods.formState.errors.newPassword?.message?.toString()}
                    error={
                      passwordFormMethods.formState.errors.newPassword && true
                    }
                    {...passwordFormMethods.register('newPassword')}
                  />
                }
                label="New password:"
                sx={styles.formControl}
              />
              <FormControlLabel
                control={
                  <TextField
                    placeholder="Confirm new password *"
                    type="password"
                    variant="standard"
                    helperText={passwordFormMethods.formState.errors.retypedPassword?.message?.toString()}
                    error={
                      passwordFormMethods.formState.errors.retypedPassword &&
                      true
                    }
                    {...passwordFormMethods.register('retypedPassword')}
                  />
                }
                label="Confirm new password:"
                sx={styles.formControl}
              />
              <Box sx={styles.formButtonsContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={styles.formButton}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={clearPasswordForm}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
        <Paper sx={styles.formContainer}>
          <Typography variant="h6">Change name and surname</Typography>
          <form
            onSubmit={personalDataFormMethods.handleSubmit(
              onChangePersonalDataSubmit,
            )}
          >
            <Box sx={styles.formBox}>
              <FormControlLabel
                control={
                  <TextField
                    placeholder="New name *"
                    variant="standard"
                    helperText={personalDataFormMethods.formState.errors.firstName?.message?.toString()}
                    error={
                      personalDataFormMethods.formState.errors.firstName && true
                    }
                    {...personalDataFormMethods.register('firstName')}
                  />
                }
                label="New name:"
                sx={styles.formControl}
              />
              <FormControlLabel
                control={
                  <TextField
                    placeholder="New surname *"
                    variant="standard"
                    helperText={personalDataFormMethods.formState.errors.firstName?.message?.toString()}
                    error={
                      personalDataFormMethods.formState.errors.firstName && true
                    }
                    {...personalDataFormMethods.register('lastName')}
                  />
                }
                label="New surname:"
                sx={styles.formControl}
              />
              <Box sx={styles.formButtonsContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={styles.formButton}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={clearPersonalDataForm}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
};
