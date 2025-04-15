import { KeySquare, Mail } from 'lucide-react'
import React from 'react'
import useForm from '../../hook/useForm'

const LoginForm = () => {
    
const initialValues = {
    email:"",
    password:""
}

const onSubmit =(formdata)=>{

console.log("login-data", formdata)
resetValue()

}

const {values, handleSubmit , handleChange, resetValue} = useForm(initialValues,onSubmit)

    return (
        <form onSubmit={handleSubmit} className='border p-4 rounded-3xl'>
            <div className='text-4xl font-extrabold py-2 '> Login Form</div>


            <div className='py-2 flex'>
                <Mail />
                <input
                name="email"
                placeholder='email'
                onChange={handleChange}
                value={values.email}
                />
            </div>
            <div className=' py-2 flex'>
                <KeySquare />
                <input
                name="password"
                placeholder='password'
                onChange={handleChange}
                value={values.passwordp}

                />
            </div>
            

            <button
                type="submit" className='cursor-grab' >Login</button>
        </form>
    )
}

export default LoginForm