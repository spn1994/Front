import { Routes, Route } from 'react-router-dom';

import { SignIn } from '../pages/Signin';
import { SignUp } from '../pages/Signup';

export function AuthRoutes(){
  return(
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

    </Routes>
  )
}
