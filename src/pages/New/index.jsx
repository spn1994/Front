import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/Noteitem';
import { Section } from '../../components/section';
import { Button } from '../../components/button';
import { ButtonText } from '../../components/buttonText';



import { api } from '../../services/api.js';



import { Container, Form } from './styles';

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //estado começa com array vazio
  const [ links, setLinks] = useState([]);
  //outro armazena link q vai ser add
  const [newLink, setNewLink] = useState("");


  const [tags, setTags] = useState([]);  
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();
  function handleBack(){
    //-1 faz n carregar cash
    navigate(-1);
  }

  function handleAddLink() {
    //estado anterior ...spred operator tira de toda lista e coloca em uma só
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }
  
  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }
  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }
  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title){
      return alert("Digite o título da nota")
    }
    if (newLink){
      return alert("Voce deixou um link no campo para adicionar, mas não clicou em adicionar. CLiquem em add ou deixe em branco")
    }
    if (newTag){
      return alert("Voce deixou uma tag no campo para adicionar, mas não clicou em adicionar. CLique em add ou deixe em branco")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    } );

    alert("Nota criada com sucesso!")
    navigate(-1);
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
           
            <ButtonText 
            title="Voltar"
            onClick={handleBack}
            />
          </header>

          <Input 
            placeholder="Título" 
            onChange={e => setTitle(e.target.value)}
            />
          <Textarea 
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}

          />

          <Section title="Links úteis">  
            {
              links.map((link, index) => (
                <NoteItem
                key={String(index)}                 
                value={link} 
                //quando vc coloca parametro tem q usar arrow function                
                onClick={() => handleRemoveLink(link)}
                />
              ))
            }        
            <NoteItem 
            isNew 
            placeholder="Novo Link"
            value={newLink} 
            onChange={e =>{setNewLink ( e.target.value)}}
            onClick={handleAddLink}
            />
            
          </Section>

          <Section title="Marcadores">
            <div class="tags">
              {
                tags.map((tag, index) => (
                <NoteItem 
                key={String(index)}
                value={tag}
                onClick={() => handleRemoveTag(tag)} 
                />                
                ))
              }
            <NoteItem 
            isNew 
            placeholder="Nova tag" 
            onChange={e => setNewTag(e.target.value)}
            value={newTag}
            onClick={handleAddTag}
            />
            </div>
          </Section>
          
          <Button 
            title="Salvar" 
            onClick={handleNewNote}
            />
        </Form>
      </main>
    </Container>
  )
}