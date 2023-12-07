import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '../services/api'


const AuthContext = createContext({})


export function AuthProvider({ children }){

  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)


  async function signIn({ email, password }){

    try {
      const { data } = await api.post('/sessions', { email, password })
      const { token, user } = data

      localStorage.setItem('@myNotes:user', JSON.stringify(user))
      localStorage.setItem('@myNotes:token', token)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
    } catch (error) {
      if(error.message){ alert(error.response.data.message) }
      else{ alert('Não foi possível logar.') }
    }
  }


  async function signOut(){
    localStorage.removeItem('@myNotes:user')
    localStorage.removeItem('@myNotes:token')

    setUser()
  }


  async function updateProfile( user, avatarFile ){
    try {

      if(avatarFile){
        const fileForm = new FormData()
        fileForm.append('avatar', avatarFile)

        const { data } = await api.patch('users/avatar', fileForm)
        user.avatar = data.avatar
      }

      await api.put('/users', { ...user })

      const uuser = {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }
      
      localStorage.setItem('@myNotes:user', JSON.stringify(uuser))
      
      setUser(user)
      alert('Perfil atualizado com sucesso!')
      
    } catch (error) {
      if(error.message){ alert(error.response.data.message) }
      else{ alert('Não foi possível atualizar.') }
    }
  }


  useEffect(() => {
    const user = localStorage.getItem('@myNotes:user')
    const token = localStorage.getItem('@myNotes:token')

    if(user && token){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(JSON.parse(user))
    }
    
    setLoadingAuth(false)
  }, [])


  return(
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuthContext(){
  return useContext(AuthContext)
}
