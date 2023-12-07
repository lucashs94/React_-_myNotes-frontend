import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'

import { api } from '../../services/api'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Background  } from './styles'

export function SignUp() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleSignUp(){
    if(!name || !email || !password){
      return alert('Preencha todos os campos!!')
    }

    await api.post('/users', { name, email, password })
    .then(() => {
      alert('Cadastrado com sucesso!')
      
      setName('')
      setEmail('')
      setPassword('')

      navigate('/')

    })
    .catch(error => {
      if(error.response){
        alert(error.response.data.message)
      }else{
        alert('Não foi possivel cadastrar.')
      }
    })

  }


  return (
    <Container>

      <Background />

      <Form>
        <h1>myNotes</h1>
        <p>Salve seus links úteis</p>

        <h2>Crie sua conta</h2>

        <Input 
          type='text'        
          placeholder='Nome'
          icon={FiUser}
          onChange={ e => setName(e.target.value)}
        />

        <Input 
          type='text'        
          placeholder='E-mail'
          icon={FiMail}
          onChange={ e => setEmail(e.target.value)}
        />

        <Input 
          type='password'        
          placeholder='Senha'
          icon={FiLock}
          onChange={ e => setPassword(e.target.value)}
        />

        <Button title={'Cadastrar'} onClick={handleSignUp}/>

        <Link to={'/'}>
          Faça Login
        </Link>

      </Form>


    </Container>
  );
}