import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router";
import { TOKEN } from "../constants";

export default function Layout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem(TOKEN)
    navigate('/')
  }

  return (
    <div>
      <AppBar>
        <Toolbar sx={{
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          paddingX: 0,
          padding: '0 20px'
        }}>
          <Typography>
            Bem-vindo, {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Button onClick={handleLogout} variant="contained" sx={{
            border: 'white 1px solid'
          }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>
    </div>
  )
}