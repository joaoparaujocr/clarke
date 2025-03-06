import { Route, Routes } from "react-router";
import { Login, Register } from "../pages/customers";
import App from "../App";

const AppRoutes = () => (
  <Routes>
    <Route path="/" Component={App} />
    <Route path="customers">
      <Route path="login" Component={Login} />
      <Route path="register" Component={Register} />
    </Route>
  </Routes>
)

export default AppRoutes