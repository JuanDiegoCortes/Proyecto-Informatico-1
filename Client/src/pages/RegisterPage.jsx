import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const {signup, isAuthenticated, errors: RegisterErrors} = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(isAuthenticated) navigate('/')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async values => {
        signup(values)
    })

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" {...register('username',{required: true})} />
            {errors.username && <span>Username is required</span>}
            <input type="email" {...register('email',{required: true})} />
            {errors.email && <span>Email is required</span>}
            <input type="password" {...register('password',{required: true})} />
            {errors.password && <span>Password is required</span>}
            <button type='submit'>
                Register
            </button>
        </form>
    </div>
    )
}

export default RegisterPage
