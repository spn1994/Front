import { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from '../../components/note';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { Section } from '../../components/section';
import { ButtonText } from '../../components/buttonText';



export function Home(){
  //estado para pesquisa
  const [search, setSearch] = useState("");

  const [tags, setTags] = useState([]);
  //estado para tag selecinadas
  const [tagsSelected, setTagsSelected] = useState([]);
  //estado para notas
  const [notes, setNotes] = useState([]);
  //navegação pagina
  const navigate = useNavigate();

  function handleTagSelected(tagName){
    if(tagName === "all"){
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);

    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    }else{
      //arrays de tag usando estado, prev state pra selecionar mais de uma
      setTagsSelected(prevState => [...prevState, tagName]);
    }  
    
  }

  function handleDetails(id){
    navigate(`/details/${id}`);
  }
  //buscar tags
  useEffect(()=> {
    //criado só para usar aqui dentro
    async function fetchTags(){
      const response = await api.get("/tags");
      setTags(response.data);
    }
    fetchTags();
  },[])
  
  //se usuario selecionar tag nova, ele é executado d novo
  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }

    fetchNotes();
    //dependencias do use effect
  }, [tagsSelected, search]);

  return(
    <Container>
      <Brand>
      <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
      title="Todos"
      onClick={() => handleTagSelected("all")} 
      $isactive={tagsSelected.length === 0}
          />
        </li>

        {
          tags && tags.map(tag => (
          <li key={String(tag.id)}>
            <ButtonText 
            title={tag.name}
            onClick={() => handleTagSelected(tag.name)}
            //metodo includes retorna verdadeiro se estiver dentro
            $isactive={tagsSelected.includes(tag.name)}
 
            />
          </li>
          ))
        }

      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
          />
          ))
          }
        </Section>
        
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}