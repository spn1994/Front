// contexto da aplicação(quando entra pagina, login ou nao logado) o arquivo é jsx pq eu uso sintaxe do jsx
import { createContext, useContext, useState, useEffect } from "react";

import { api } from '../services/api';

const AuthContext = createContext({});

//recebe filho, todas rotas da aplicação
function AuthProvider({ children }){
  const[data, setData] = useState({});
  // com chaves pode por infoirmação indpedente da ordem
  async function signIn({ email, password }) {
  try {    
      const response = await api.post("/sessions", { email, password });
      const { user,token } = response.data;

      //para aramzenar pessoa logada e a JSON tranforma objeto em string
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({user,token});

      //console.log(user,token);
    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
      }else{
        alert("Não foi possível entrar.");
      }
    }
  }
  // para remover login
  function signOut() {
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");
    //objeto vazio
    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      
      if(avatarFile) {
        //upload da imagem
        const fileUploadForm = new FormData();
        //praadd dentro formulário
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("Perfil atualizado!");

    } catch (error) {
      if (error.response){
        alert(error.response.data.message);
      }else{
        alert("Não foi possível atualizar o perfil");
      }
    }
  }


  //função pra manter pagina aberta quando por algum motivo fechar aba
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if(token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;


      setData({
        token,
        //éguei usuario formato texto e tranformei objeto d novo
        user:JSON.parse(user)
       });
    }

  }, [])

  return(
    <AuthContext.Provider value={{ 
      signIn,
      signOut,
      updateProfile, 
      user: data.user
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
//usando padrao de escrever hook
function useAuth(){
  const context = useContext(AuthContext);
  return context;

}

export { AuthProvider, useAuth };