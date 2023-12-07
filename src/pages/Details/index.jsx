/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

import { Container, Links, Content } from "./styles";
import { api } from "../../services/api";


export function Details() {
  const params = useParams()
  const navigate = useNavigate()

  const [note, setNote] = useState(null)


  function handleBack(){
    navigate(-1)
  }


  async function handleRemove(){
    const confirm = window.confirm('Deseja realmente remover a nota?')

    if(confirm){
      await api.delete(`notes/${params.id}`)
      handleBack()
    }
  }


  useEffect(() => {
    async function fetchNote(){
      const { data } = await api.get(`notes/${params.id}`)
      setNote(data)
    }

    fetchNote()
  }, [])


  return (
    <Container>

      <Header />

      {
        note && 
        <main>
          <Content>

            <ButtonText 
              title={'Excluir Nota'} 
              onClick={handleRemove}
            />

            <h1>{note.title}</h1>

            <p>
              {note.description}
            </p>

            {
              note.links &&
              <Section
                title={'Links Úteis'}
              >
                <Links>
                  {
                    note.links.map( link => (

                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }


            {
              note.tags &&
              <Section
                title={'Marcadores'}
              >
                {
                  note.tags.map( tag => (

                    <Tag 
                      key={String(tag.id)}
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }


            <Button 
              title={'Voltar'}
              onClick={ handleBack }
            />

          </Content>
        </main>
      }

    </Container>
  )
}
