import React from 'react'
import { resetClientPassword } from '../services/auth.service'

const Login = () => {
  return (
    <div>
      <button  className='border-1 w-fit px-2 py-3' onClick={()=> resetClientPassword('smfdevteam@gmail.com')}>RESET</button>
    </div>
  )
}

export default Login