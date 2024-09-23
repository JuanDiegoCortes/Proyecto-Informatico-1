import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  const {signin} = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="email" {...register('email',{required: true})} />
            {errors.email && <span>Email is required</span>}
            <input type="password" {...register('password',{required: true})} />
            {errors.password && <span>Password is required</span>}
            <button type='submit'>
                Login
            </button>
        </form>
    </div>
  )
}

export default LoginPage

