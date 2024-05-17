import React from 'react'
import { Button, user } from '@nextui-org/react'
import { login } from '../../Api/api'
import { useContext } from 'react';
import { stateProvider } from "../../App_Context"; 
export default function Login() {
  const { app_state , setAppState } = useContext(stateProvider);
  
  const handleClick = async ()=>{
    const response = await login({email:"test2@gmail.com",password:"123123"})
    localStorage.setItem("X-ACCESS-TOKEN", response.idToken);
    localStorage.setItem("X-REFRESH-TOKEN", response.refreshToken);
    setAppState((prev)=>{
      return {...prev,user:response}
    })
  }
  return (
    <div><h1>{JSON.stringify(app_state)}</h1>
      <Button color="primary" variant="solid" onClick={handleClick}>
        Solid
      </Button>
    </div>

  )
}

export default Login