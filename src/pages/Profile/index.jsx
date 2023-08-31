import { useState }  from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { ButtonText } from '../../components/buttonText';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.js';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { api } from '../../services/api.js'
import { Container, Form, Avatar } from './styles';

export function Profile(){
  const { user, updateProfile } = useAuth(); 

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();
  //estados da foto do avatar
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  const navigate = useNavigate()


  function handleBack(){
    //-1 faz n carregar cash
    navigate(-1);
  }

  async function handleUpdate(){
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    } 
    // função object assign junta duas informaçoes 
    const userUpdated = Object.assign(user, updated);      
    await updateProfile({ user: userUpdated, avatarFile });
  }

  function handleChangeAvatar(event){
    // 1 unico arquivo
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        <button 
        type="button" 
        onClick={handleBack}>
          <FiArrowLeft />
        </button>
      </header>    
      <Form>
        <Avatar>
          <img src={avatar} 
          alt="Foto do Usuário"/>
          <label htmlFor="avatar">
            <FiCamera />
            <input
              //antes tava link do github
              id="avatar"
              /* file abre janelinha de escolher arquivo */
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input 
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

       <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          placeholder="Senha Atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />
        <Input 
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdate} />
      </Form>

    </Container>
  )
}