import React, { useState } from 'react';

const Auth = () => {
    const initialData = { username: '', password: '' }
    const [form, setForm] = useState(initialData)
    const [guest, setGuest] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const handleSubmit = () => {
        
    }

    const handleChange = () => {

    }

    const handleChangeFormType = () => {
        setIsSignup(!isSignup)
    }

    return <div>
        {!guest ?
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange}></input>
                <input type='password' onChange={handleChange}></input>
                <button type='submit'>Submit</button>
                <button onClick={handleChangeFormType}>
                    {isSignup ? "Login" : "Create Account"}
                </button>
            </form>
            :
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange}></input>
                <button type='submit'>Play</button>
            </form>
        }
    </div>;
};

export default Auth;
