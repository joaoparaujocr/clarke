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
  const { user, loading, error, refetch, dispatch: dispatchMe, skip } = useMe()
  const publicPaths = ['/customers/register', '/customers/login', '/suppliers/register']

  useEffect(() => {
    if (!loading && !user && (error || skip)) {
      if (publicPaths.includes(location.pathname)) {
        navigate(location.pathname)
      } else {
        navigate('/customers/login')
      }
    }

    if (user) {
      if ([...publicPaths, '/'].includes(location.pathname)) {
        navigate('/customers/home')
      } else {
        navigate(location.pathname)
      }
    }
  }, [error, loading, user, skip, refetch])

  if (loading) {
    return (
      <CircularProgress size='100px' />
    )
  }

  return (
    <AuthContext value={{
      user,
      refetch,
      dispatchMe
    }}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider