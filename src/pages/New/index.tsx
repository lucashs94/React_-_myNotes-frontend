// @ts-nocheck
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { api } from '../../services/api'

import { Input } from '../../components/Input'
import { Header } from '../../components/Header'
import { TextArea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

import { Container, Form } from './styles'


export function New() {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState('')

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')


  function handleAddLink(){
    setLinks(previous => [...previous, newLink])
    setNewLink('')
  }
  
  
  function handleRemoveLink(deleted){
    setLinks(previous => previous.filter(link => link !== deleted))
  }
  
  
  function handleAddTag(){
    setTags(previous => [...previous, newTag])
    setNewTag('')
  }
  
  
  function handleRemoveTag(deleted){
    setTags(previous => previous.filter(tag => tag !== deleted))
  }


  async function handleNewNote(){
    await api.post('notes', {
      title,
      description,
      tags,
      links,
    })

    toast.success(
      'Nota criada com sucesso',
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    )

    navigate('/')
  }


  return (
    <Container>

      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to={'/'}>Voltar</Link>
          </header>

          <Input 
            placeholder='Título'
            icon={''}
            onChange={ e => setTitle(e.target.value) }
          />

          <TextArea 
            placeholder='Observações'
            onChange={ e => setDescription(e.target.value) }
          />

          <Section
            title={'Links úteis'}
          >
            {
              links.map( (link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={ () => handleRemoveLink(link) }
                />
              ))
            }

            <NoteItem 
              placeholder='Novo link'
              isNew
              value={newLink}
              onChange={ e => setNewLink(e.target.value) }
              onClick={handleAddLink}
            />
          </Section>

          <Section
            title={'Marcadores'}
          >
            <div className="tags">
              {
                tags.map( (tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={ () => handleRemoveTag(tag) }
                  />
                ))
              }

              <NoteItem
                placeholder='Novo link'
                isNew
                value={newTag}
                onChange={ e => setNewTag(e.target.value) }
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title={'Salvar'}
            onClick={handleNewNote}
          />
          
        </Form>
      </main>

    </Container>
  );
}