import { Route, Routes } from "react-router";
import { Login, Register } from "../pages/customers";
import AuthLayout from "../layouts/AuthLayout";

const AppRoutes = () => (
  <Routes>
    <Route path="customers">
      <Route Component={AuthLayout}>
        <Route path="login" Component={Login}/>
        <Route path="register" Component={Register} />
      </Route>
    </Route>
  </Routes>
)

export default AppRoutes