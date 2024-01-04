import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import * as styles from './JobForm.styles';

const schema = z.object({
  title: z
    .string({ required_error: 'Please fulfill marked fields' })
    .min(3, { message: 'Minimum length is 3' }),
  companyName: z
    .string({ required_error: 'Please fulfill marked fields' })
    .min(5, { message: 'Minimum length is 5' }),
  logo: z
    .string({ required_error: 'Please fulfill marked fields' })
    .min(5, { message: 'Minimum length is 5' }),
  shortDescription: z
    .string({ required_error: 'Please fulfill marked fields' })
    .min(5, { message: 'Minimum length is 5' }),
  longDescription: z
    .string({ required_error: 'Please fulfill marked fields' })
    .min(5, { message: 'Minimum length is 5' }),
});

type JobFormValues = z.infer<typeof schema>;

type Props = {
  defaultValues?: JobFormValues;
  onSubmit: (data: JobFormValues) => void;
  isReadOnly?: boolean;
};

const EMPTY_JOB_FORM: JobFormValues = {
  title: '',
  companyName: '',
  logo: '',
  shortDescription: '',
  longDescription: '',
};

export const JobForm = ({
  defaultValues,
  onSubmit,
  isReadOnly = false,
}: Props) => {
  const { register, handleSubmit, formState } = useForm<JobFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? EMPTY_JOB_FORM,
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Box sx={styles.formBox}>
        <Box sx={styles.formColumnBox}>
          <TextField
            label="Job title"
            variant="outlined"
            InputProps={{
              readOnly: isReadOnly,
            }}
            helperText={formState.errors.title?.message?.toString()}
            error={Boolean(formState.errors.title)}
            {...register('title')}
          />
          <TextField
            label="Company name"
            variant="outlined"
            InputProps={{
              readOnly: isReadOnly,
            }}
            helperText={formState.errors.companyName?.message?.toString()}
            error={Boolean(formState.errors.companyName)}
            sx={styles.middleTextField}
            {...register('companyName')}
          />
          <TextField
            label="Logo"
            variant="outlined"
            InputProps={{
              readOnly: isReadOnly,
            }}
            helperText={formState.errors.logo?.message?.toString()}
            error={Boolean(formState.errors.logo)}
            {...register('logo')}
          />
        </Box>
        <Box sx={styles.formColumnBox}>
          <TextField
            label="Short description"
            variant="outlined"
            InputProps={{
              readOnly: isReadOnly,
            }}
            helperText={formState.errors.shortDescription?.message?.toString()}
            error={Boolean(formState.errors.shortDescription)}
            {...register('shortDescription')}
          />
          <TextField
            label="Long description"
            multiline
            rows={4}
            InputProps={{
              readOnly: isReadOnly,
            }}
            helperText={formState.errors.longDescription?.message?.toString()}
            error={Boolean(formState.errors.longDescription)}
            sx={styles.textArea}
            {...register('longDescription')}
          />
        </Box>
      </Box>
      <Box>
        <Button
          type="submit"
          variant="contained"
          disabled={isReadOnly}
          sx={{
            mt:
              formState.errors.longDescription || formState.errors.logo ? 9 : 1,
            width: 1,
          }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
