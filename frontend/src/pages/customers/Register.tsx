import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import { NavLink, useNavigate } from 'react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { customerRegister } from '../../validations/customerRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql } from '../../__generated__';
import { ApolloError, useMutation } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';

type InputFields = z.infer<typeof customerRegister>

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

const REGISTER_CUSTOMER = gql(`
  mutation CreateCustomer($data: CreateCustomerInput!) {
    createCustomer(data: $data) {
      email
      firstName
      lastName
    }
  }
`)

export default function Register(props: { disableCustomTheme?: boolean }) {
  const [registerCustomer, { loading }] = useMutation(REGISTER_CUSTOMER);
  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm<InputFields>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    },
    resolver: zodResolver(customerRegister)
  })

  const handleSumitForm: SubmitHandler<InputFields> = async (data) => {
    try {
      const response = await registerCustomer({
        variables: {
          data
        }
      })

      if (response.data?.createCustomer.email) {
        toast.success('Seu usuario foi criado com sucesso')
        navigate('/customers/login', { state: { email: response.data.createCustomer.email } })
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message)
      }
    }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center" alignItems='center' width="100%">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Registrar-se como cliente
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
            <Controller
              control={control}
              name='firstName'
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
                    error={!!errors.firstName?.message}
                    helperText={errors.firstName?.message}
                    placeholder="Nome"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.firstName?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='lastName'
              render={({ field }) => (
                <FormControl>
                  <FormLabel
                    htmlFor={field.name}
                    sx={{
                      textAlign: 'left'
                    }}
                  >
                    Sobrenome
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
                    error={!!errors.lastName?.message}
                    helperText={errors.lastName?.message}
                    placeholder="Sobrenome"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.lastName?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='email'
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
                    Email
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
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    placeholder="seu@email.com"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.email?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <FormControl>
                  <FormLabel
                    htmlFor={field.name}
                    sx={{
                      textAlign: 'left'
                    }}
                  >
                    Senha
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
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    placeholder="••••••••••••"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.password?.message ? 'error' : 'primary'}
                  />
                </FormControl>
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              loadingIndicator={<CircularProgress size={24} sx={{ color: "primary" }} />}
            >
              Registrar-se
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              Já possui conta?{' '}
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
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}