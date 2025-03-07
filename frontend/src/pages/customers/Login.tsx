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
import { NavLink, useNavigate } from 'react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerLogin } from '../../validations/customerLogin';
import { gql } from '../../__generated__';
import { ApolloError, useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { CircularProgress } from '@mui/material';

interface InputValues {
  email: string
  password: string
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '380px',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(() => ({
  width: '100%'
}));

const AUTH_CUSTOMER = gql(`
  mutation AuthCustomer($authCustomerData: AuthCustomerInput!) {
    authCustomer(data: $authCustomerData) {
      token
      customer {
        email
      }
    }
  }
`)

export default function Login() {
  const navigate = useNavigate()
  const [authCustomer, { loading }] = useMutation(AUTH_CUSTOMER)
  const { refetch, dispatchMe } = useAuth()

  const { control, formState: { errors }, handleSubmit } = useForm<InputValues>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(customerLogin)
  })

  const handleSubmitForm: SubmitHandler<InputValues> = async (authCustomerData) => {
    try {
      const response = await authCustomer({
        variables: {
          authCustomerData
        }
      })

      if (response.data?.authCustomer.token) {
        localStorage.setItem('@token:clarke', response.data.authCustomer.token)
        toast.success('Seu usuario foi logado com sucesso')
        dispatchMe({ field: 'skip', value: false })
        refetch()
        navigate('/customers/home')
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message)
      }
    }
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer display='flex' direction="column" width="100%" sx={{ minHeight: '100vh' }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Login do cliente
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSubmitForm)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <FormControl>
                  <FormLabel
                    htmlFor="email"
                    sx={{
                      textAlign: 'left'
                    }}
                  >
                    Email
                  </FormLabel>
                  <TextField
                    slotProps={{
                      input: {
                        ...field
                      },
                      formHelperText: {
                        sx: {
                          marginLeft: 0
                        }
                      }
                    }}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    placeholder="seu@email.com"
                    autoComplete="email"
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
                    htmlFor="password"
                    sx={{
                      textAlign: 'left'
                    }}
                  >
                    Senha
                  </FormLabel>
                  <TextField
                    slotProps={{
                      input: {
                        ...field
                      },
                      formHelperText: {
                        sx: {
                          marginLeft: 0
                        }
                      }
                    }}
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    name="password"
                    placeholder="••••••••••••"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
              fullWidth
              variant="contained"
              type='submit'
              loading={loading}
              loadingIndicator={<CircularProgress size={24} sx={{ color: "primary" }} />}
            >
              Entrar
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              Não possue conta?{' '}
              <NavLink to='/customers/register'>
                <Typography
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Registrar-se
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              Que ser um fornecedor?{' '}
              <NavLink to='/suppliers/register'>
                <Typography
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Registrar-se como fornecedor
                </Typography>
              </NavLink>
            </Box>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}