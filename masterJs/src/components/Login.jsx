import { Key, Mail } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const nav = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk3MDY4MDAwLCJleHAiOjE2OTcwNzE2MDB9.kJt3VPYlfrtA3X4wU8JxkOhBkW09R9u9ehPb6EJsYcI",
            role: email.includes("admin")
                ? "admin" :
                email.includes("manager") ? "manager" : "customer"
        };

        if (remember) {
            localStorage.setItem("token", response.token)
            localStorage.setItem("role", response.role)
        } else {
            sessionStorage.setItem("token", response.token)
            sessionStorage.setItem("role", response.role)
        }

        if (response.role === "admin") nav('/admin')
        else if (response.role === "manager") nav('/manager')
        else nav('/customer')


    }


    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ' >
                <div className='sm:text-xl md:text-4xl lg:text-7xl mb-4 text-center font-semibold'>Welcome To Incede tech</div>

            <div className='p-6 rounded-2xl border'>
                <form onSubmit={handleSubmit} >
                    <div className='flex gap-1'>
                        <Mail/>
                        <input
                            type="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            required
                            placeholder='Email'
                        />
                    </div>
                    <div className='flex gap-1'> 
                        <Key/>
                        <input
                            type="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            required
                            placeholder='Password'
                        />
                    </div>
                    <div className='flex gap-1' >
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />

                        <span> Remember</span>
                    </div>
                    <div>
                        <button className="cursor-pointer"  type= "submit" > Login </button>
                    </div>

                </form>

            </div>
                <a href='/'> Forgot Password</a>

        </div>
    )
}

export default Login