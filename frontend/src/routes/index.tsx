import { Navigate, Route, Routes } from "react-router";
import { Login, Register, Home } from "../pages/customers";
import RegisterSuppliers from "../pages/suppliers/Resgister";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../layouts/Layout";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/customers/login" replace />} />

    <Route path="customers">
      <Route path="login" index Component={Login} />
      <Route path="register" Component={Register} />
      <Route element={<Layout />}>
        <Route
          path="home"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
      </Route>
    </Route>
    <Route path="suppliers">
      <Route path="register" Component={RegisterSuppliers} />
    </Route>
  </Routes>
)

export default AppRoutes