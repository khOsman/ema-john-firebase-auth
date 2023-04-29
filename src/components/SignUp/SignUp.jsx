import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {

    // Context
    const {createUser} = useContext(AuthContext);
    // State
    const [error,setError]= useState('');
    const [success,setSuccess]=useState('');

    const handleSignUp = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm.value;

        setSuccess('');
        setError('');
        if(password!==confirmPassword){
            setError('Password did not match');
            return
        }
        else if(password.length<6){
            setError('Password must be 6 characters');
            return
        }

        createUser(email,password)
        .then(result =>{
            console.log(result.user);
            setSuccess('Registration Successful');
        })
        .catch(error =>{
            setError(error.message);
        });

        form.reset();
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className='form-container'>
                <h2 className='form-title'>Sign Up</h2>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirm" placeholder="confirm password" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <p><small><Link to='/login'>Already have an account</Link></small></p>
                <p className='text-error'>{error}</p>
                <p className='text-success'>{success}</p>
            </form>
            
        </div>
    );
};

export default SignUp;