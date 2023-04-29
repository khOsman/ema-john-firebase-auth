import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const Login = () => {

    const { signIn } = useContext(AuthContext);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setSuccess('');
        setError('');

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Login Successful');
                navigate(from, { replace: true });
            })
            .catch(error => {
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
                    <input type={show ? "text" : "password"} name="password" placeholder="password" required />
                    <p onClick={() => setShow(!show)}>
                        {show ? <span>Hide Password</span> : <span>Show Password</span>}
                    </p>
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