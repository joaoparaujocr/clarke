import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql } from '../../__generated__';
import { ApolloError, useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { supplierRegister } from '../../validations/supplierRegister';
import { useState } from 'react';
import api from '../../api';
import { Divider } from '@mui/material';
import { NavLink } from 'react-router';
import { NumericFormat } from 'react-number-format'

type InputFields = z.infer<typeof supplierRegister>

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  minWidth: '380px',
  maxWidth: '380px',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(() => ({
  minHeight: '100%',
  width: '100%'
}));


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const REGISTER_SUPPLIER = gql(`
  mutation CreateSupplier($data: CreateSupplierInput!) {
    createSupplier(data: $data) {
      id
    }
  }
`)

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [registerSupplier, { loading }] = useMutation(REGISTER_SUPPLIER);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<InputFields>({
    defaultValues: {

    },
    resolver: zodResolver(supplierRegister)
  })

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(file);
        setValue('file', file)
      }
    }
  }

  const handleSumitForm: SubmitHandler<InputFields> = async (data) => {
    setIsLoading(true)
    try {
      if (!selectedImage) {
        alert('Por favor, selecione uma imagem');
        return;
      }
      const formData = new FormData();
      formData.append('file', selectedImage);
      const uploadImage = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      await registerSupplier({
        variables: {
          data: {
            costPerKwh: data.costPerKwh,
            minimumKwhLimit: data.minimumKwhLimit,
            name: data.name,
            state: data.state,
            logoUrl: uploadImage.data.url
          }
        }
      })


      toast.success('Fornecedor cadastrado com sucesso')

    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center" alignItems='center' width="100%" sx={{ minHeight: '100vh' }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Registrar-se como fornecedor
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSumitForm)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              {selectedImage?.name ? `${selectedImage?.name.slice(0, 25)}...` : 'Sua logo'}
              <VisuallyHiddenInput
                type="file"
                onChange={handleFile}
                multiple
                accept="image/*"
              />
            </Button>
            <Controller
              control={control}
              name='name'
              render={({ field }) => (
                <FormControl>
                  <FormLabel
                    htmlFor={field.name}
                    sx={{
                      textAlign: 'left'
                    }}
                  >
                    Nome
                  </FormLabel>
                  <TextField
                    slotProps={{
                      input: { ...field },
                      formHelperText: {
                        sx: {
                          marginLeft: 0
                        }
                      }
                    }}
                    error={!!errors.name?.message}
                    helperText={errors.name?.message}
                    placeholder="Nome"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.name?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='state'
              render={({ field }) => (
                <FormControl>
                  <FormLabel
                    htmlFor={field.name}
                    sx={{
                      textAlign: 'left',
                      formHelperText: {
                        sx: {
                          marginLeft: 0
                        }
                      }
                    }}
                  >
                    Estado
                  </FormLabel>
                  <TextField
                    slotProps={{
                      input: { ...field },
                      formHelperText: {
                        sx: {
                          marginLeft: 0
                        }
                      }
                    }}
                    error={!!errors.state?.message}
                    helperText={errors.state?.message}
                    placeholder="Estado (Ex: SP ou São Paulo)"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.state?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='costPerKwh'
              render={({ field: { name, onBlur, value, disabled } }) => (
                <FormControl>
                  <FormLabel
                    htmlFor={name}
                    sx={{
                      textAlign: 'left'
                    }}
                  >
                    Custo por kWh
                  </FormLabel>
                  <NumericFormat
                    name={name}
                    onBlur={onBlur}
                    value={value}
                    disabled={disabled}
                    customInput={TextField}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    onValueChange={(values) => setValue('costPerKwh', values?.floatValue || 0)}
                    error={!!errors.costPerKwh?.message}
                    helperText={errors.costPerKwh?.message}
                    placeholder="Custo por kWh"
                    fullWidth
                    variant="outlined"
                    color={errors.costPerKwh?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='minimumKwhLimit'
              render={({ field: { name, onBlur, value, disabled } }) => (
                <FormControl>
                  <FormLabel
                    htmlFor={name}
                    sx={{
                      textAlign: 'left'
                    }}
                  >
                    Limite mínimo de kWh
                  </FormLabel>
                  <NumericFormat
                    name={name}
                    onBlur={onBlur}
                    value={value}
                    disabled={disabled}
                    customInput={TextField}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix='kWh '
                    onValueChange={(values) => setValue('minimumKwhLimit', values?.floatValue || 0)}
                    error={!!errors.minimumKwhLimit?.message}
                    helperText={errors.minimumKwhLimit?.message}
                    placeholder="Limite mínimo de kWh"
                    fullWidth
                    variant="outlined"
                    color={errors.minimumKwhLimit?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={loading || isLoading}
              loadingIndicator={<CircularProgress size={24} sx={{ color: "primary" }} />}
            >
              Registrar-se
            </Button>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                É um cliente ?{' '}
                <NavLink to='/customers/login'>
                  <Typography
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Entrar
                  </Typography>
                </NavLink>
              </Box>
            </Box>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}