import { useState, useEffect } from 'react';
//regra do componente é começar com letra maiúscula
import { Container, Links, Content } from './styles';
//parametros q existe rota
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api'

import { Tag } from '../../components/tag';
import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Section } from '../../components/section';
import { ButtonText} from '../../components/buttonText';

export function Details(){
  //começa sem conteudo
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate()




  //função pra voltar pagina
  function handleBack(){
    //-1 faz n carregar cash
    navigate(-1);
  }
  //função excluir nota
  async function handleRemove(){
    const confirm = window.confirm("Deseja remover esta nota?")
    if (confirm){
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }
//sem dependencia pra carregar 1x so
  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data);
    }

    fetchNotes();
  },[])

  return(
    <Container>
      <Header/>
    {
      //se tem conteudo mostra data(os arquivos dentro)
      data &&
      <main>
        <Content>
        <ButtonText 
        title="Excluir nota"
        onClick={handleRemove}
        />

        <h1>
          {data.title}
        </h1>

        <p>
          {data.description}
        </p>
        {/* children n foi passado como valor comum */}
        {
         data.links &&
        <Section title="Links úteis">
      
          <Links>
          {
            data.links.map(link =>(
            <li key={String(link.id)}>
             <a href={link.url} target="_blank">
               {link.url}
              </a>
            </li>
           ))
         }  
          
          </Links>
        </Section>
       }

        {
        data.tags &&
        <Section title="Marcadores">
          {
         data.tags.map(tag =>(          
         <Tag 
            key={String(tag.id)}
            title={tag.name}
         />
          ))
          }
        </Section>
       }
    
      {/* se for colocar numero é entre {} */}
      <Button 
      title="Voltar" 
      onClick={handleBack}
      />
      </Content>
        </main>
     }
     </Container>   
   )
  }