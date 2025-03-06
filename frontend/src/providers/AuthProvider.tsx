import { ReactNode, useEffect } from "react"
import { AuthContext } from "../context"
import useMe from "../hooks/useMe"
import { useLocation, useNavigate } from "react-router"
import { CircularProgress } from "@mui/material"

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading, error, refetch } = useMe()

  useEffect(() => {
    if (!loading && !user && error) {
      if (location.pathname === '/customers/register') {
        navigate(location.pathname)
      } else {
        navigate('/customers/login')
      }
    }

    if (user) {
      if (['/customers/register', '/customers/login', '/'].includes(location.pathname)) {
        navigate('/customers/home')
      } else {
        navigate(location.pathname)
      }
    }
  }, [error, loading, user])

  if (loading) {
    return (
      <CircularProgress size='100px' />
    )
  }

  return (
    <AuthContext value={{
      user,
      refetch
    }}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider