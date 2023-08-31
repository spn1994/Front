import { BrowserRouter } from "react-router-dom";
import { useAuth } from '../hooks/auth.js';

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes(){
  //acesso ao usuario
  const { user } = useAuth();
  return(
  <BrowserRouter>
    {/* condição para qual caminho usuario vai, if ternario */}
    {user ? <AppRoutes/> : <AuthRoutes />}
  </BrowserRouter>
  )
}
