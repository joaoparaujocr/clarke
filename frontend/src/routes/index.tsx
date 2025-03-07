import { Navigate, Route, Routes } from "react-router";
import { Login, Register, Home } from "../pages/customers";
import RegisterSuppliers from "../pages/suppliers/Resgister";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/customers/login" replace />} />

    <Route path="customers">
      <Route path="login" index Component={Login} />
      <Route path="register" Component={Register} />
      <Route path="home" Component={Home} />
    </Route>
    <Route path="suppliers">
      <Route path="register" Component={RegisterSuppliers} />
    </Route>
  </Routes>
)

export default AppRoutes