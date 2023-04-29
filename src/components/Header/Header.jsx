import React, { useContext, useState } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => {

            })
            .catch(error => {
                console.log(error.message);
            });
    }

    console.log('header', user);
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {!user && <Link to="/login">Login</Link>}
                {!user && <Link to="/signup">SignUp</Link>}
            </div>
            <div>
                {
                    user && <p>{user.email} <button onClick={handleLogOut}>Log Out</button></p>
                }

            </div>
        </nav>
    );
};

export default Header;