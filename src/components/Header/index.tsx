// @ts-nocheck
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RiShutDownLine } from 'react-icons/ri'

import { api } from '../../services/api';

import avatarPlaceHolder from '../../assets/avatar.svg'

import { useAuthContext } from '../../contexts/authContext';

import { Container, Profile, Logout } from './styles'


export function Header() {

  const navigate = useNavigate()
  const { user, signOut } = useAuthContext()

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder


  async function handleSignOut(){
    signOut()
    navigate('/')
  }

  return (
    <Container>
      
      <Profile to='/profile'>
        <img 
          src={avatarURL}
          alt={user.name}
        />

        <div>
          <span>Bem-vindo,</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout
        onClick={handleSignOut}
      >
        <RiShutDownLine />
      </Logout>

    </Container>
  );
}