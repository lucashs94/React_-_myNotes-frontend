import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'

import { useAuthContext } from '../../contexts/authContext'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Background  } from './styles'


export function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuthContext()

  function handleSignIn(){
    signIn({ email, password })
  }


  return (
    <Container>
      
      <Form>
        <h1>myNotes</h1>
        <p>Salve seus links úteis</p>

        <h2>Faça seu Login</h2>

        <Input 
          type='text'        
          placeholder='E-mail'
          icon={FiMail}
          onChange={ e => setEmail(e.target.value) }
        />

        <Input 
          type='password'        
          placeholder='Senha'
          icon={FiLock}
          onChange={ e => setPassword(e.target.value) }
        />

        <Button 
          title={'Entrar'}
          onClick={handleSignIn}
        />

        <Link to={'/register'}>
          Criar conta
        </Link>

      </Form>

      <Background />

    </Container>
  );
}