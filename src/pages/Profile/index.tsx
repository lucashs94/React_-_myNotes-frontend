// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'

import { useAuthContext } from '../../contexts/authContext'

import avatarPlaceHolder from '../../assets/avatar.svg'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Avatar } from './styles'
import { api } from '../../services/api'


export function Profile() {

  const { user, updateProfile } = useAuthContext()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [paswordOld, setPaswordOld] = useState('')
  const [passwordNew, setPasswordNew] = useState('')
  
  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder
  const [avatar, setAvatar] = useState(avatarURL)
  const [avatarFile, setAvatarFile] = useState(null)


  async function handleUpdate(){
    const userUpdated = {
      name, 
      email, 
      password: passwordNew, 
      old_password: paswordOld
    }

    const updated = Object.assign(user, userUpdated)

    await updateProfile( updated, avatarFile )

  }


  function handleChangeAvatar(event){

    const file = event.target.files[0]
    setAvatarFile(file)

    const preview = URL.createObjectURL(file)
    setAvatar(preview)

  }


  return (
    <Container>

      <header>

        <Link to={'/'}>
          <FiArrowLeft />
        </Link>

      </header>

      <Form>

        <Avatar>
          <img 
            src={avatar}
            alt="Foto do usuario" 
          />

          <label htmlFor="avatar">
            <FiCamera />

            <input 
              id='avatar'
              type='file'
              onChange={handleChangeAvatar}
            />

          </label>
        </Avatar>

        <Input 
            type='text'        
            placeholder='Nome'
            icon={FiUser}
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Input 
            type='text'        
            placeholder='E-mail'
            icon={FiMail}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input 
            type='password'        
            placeholder='Senha atual'
            icon={FiLock}
            onChange={e => setPaswordOld(e.target.value)}
          />

          <Input 
            type='password'        
            placeholder='Nova Senha'
            icon={FiLock}
            onChange={e => setPasswordNew(e.target.value)}
          />


          <Button 
            title={'Salvar'}
            onClick={handleUpdate}
          />

      </Form>

    </Container>
  );
}