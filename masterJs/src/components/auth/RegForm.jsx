import React from 'react'
import useForm from "../../hook/useForm"
import { PersonStanding, Mail, KeySquare } from "lucide-react"

const RegForm = () => {

    const intialvalue = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const onSubmit = (formData) => {
        console.log("data submitted with ", formData);
        resetValue()

    }

    const { values,
        handleChange,
        handleSubmit,
        resetValue } = useForm(intialvalue, onSubmit);


    return (
        <form onSubmit={handleSubmit} className='border p-4 rounded-3xl'>
            <div className='text-4xl font-extrabold py-2 ' >Registration Form</div>
            <div className=' py-2 flex'>
                <PersonStanding />
                <input
                    name='name'
                    onChange={handleChange}
                    placeholder='name'
                    value={values.name}
                />
            </div>

            <div className='py-2 flex'>
                <Mail />
                <input
                    name='email'
                    onChange={handleChange}
                    placeholder='email'
                    value={values.email}
                />
            </div>
            <div className=' py-2 flex'>
                <KeySquare />
                <input
                    name='password'
                    onChange={handleChange}
                    placeholder='password'
                    value={values.password}
                />
            </div>
            <div className=' py-2  flex'>
                <KeySquare />
                <input
                    name='confirmPassword'
                    onChange={handleChange}
                    placeholder='confirmPassword'
                    value={values.confirmPassword}
                />
            </div>

            <button 
            type="submit" className='cursor-grab' >Register</button>
        </form>
    )
}

export default RegForm