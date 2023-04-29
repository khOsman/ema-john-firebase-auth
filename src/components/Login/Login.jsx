import React, { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const Login = () => {

    const {signIn} = useContext(AuthContext);
    const [success,setSuccess]=useState('');
    const [error,setError] = useState('');

    const handleLogin=event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setSuccess('');
        setError('');

        signIn(email,password)
        .then(result =>{
           console.log(result.user);
           setSuccess('Login Successful');
        })
        .catch(error =>{
            setError(error.message);
        });

        form.reset();
    }

   

    return (
        <div>
            <form onSubmit={handleLogin} className='form-container'>
                <h2 className='form-title'>Login</h2>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
                <p><small><Link to='/signup'>New to Ema-John</Link></small></p>
                <p className='text-error'>{error}</p>
                <p className='text-success'>{success}</p>
            </form>

        </div>
    );
};

export default Login;