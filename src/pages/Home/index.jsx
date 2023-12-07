// @ts-nocheck
import { useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi'

import { api } from '../../services/api';

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'
import { useNavigate } from 'react-router-dom';


export function Home() {

  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [tags, setTags] = useState()
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])


  function handleTagSelected(tagName){

    if(tagName === 'all'){
      return setTagsSelected([])
    }


    const alreadySelected = tagsSelected.includes(tagName)

    if(alreadySelected){
      setTagsSelected(previous => previous.filter( tag => tag !== tagName) )

    }else{

      setTagsSelected(previous => [...previous, tagName])
    }

  }


  function handleDetails(id){
    navigate(`/details/${id}`, {  })
  }


  useEffect(() => {
    async function fetchTags(){
      const { data } = await api.get('tags')
      setTags(data)
    }

    fetchTags()
  }, [])


  useEffect(() => {
    async function fetchNotes(){

      const { data } = await api.get(`notes?title=${search}&tags=${tagsSelected}`)
      setNotes(data)

    }

    fetchNotes()
  }, [tagsSelected, search])


  return (
    <Container>

      <Brand>
        <h1>myNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            title={'Todos'} 
            onClick={ () => handleTagSelected('all') }
            isActive={ tagsSelected.length === 0 }
          />
        </li>

        {
          tags && tags.map( tag => (
            <li
              key={String(tag.id)}
            >
              <ButtonText 
                title={tag.name} 
                onClick={ () => handleTagSelected(tag.name) }
                isActive={ tagsSelected.includes(tag.name) }
              />
            </li>
          ))
        }

      </Menu>

      <Search>
        <Input 
          icon={FiSearch}
          placeholder={'Pesquisar pelo titulo'}
          onChange={ e => setSearch(e.target.value) }
        />
      </Search>

      <Content>

        <Section title={'Minhas notas'}>
          {
            notes.map( note =>(
              <Note 
                key={String(note.id)}
                data={note}
                onClick={ () => handleDetails(note.id) }
              />
            ))
          }
          
        </Section>

      </Content>

      <NewNote to={'/new'}>
        <FiPlus />
        Criar nota
      </NewNote>

    </Container>
  );
}