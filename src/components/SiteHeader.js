import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userData } from '../helpers';

export default function SiteHeader() {
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        const user = userData();
        console.log(user)
        
        if (user && user.jwt) {
            setIsAuth(true);
        }
    }, []);

    return (
        <header className='site-header'>
            <div className="site-title">
                <Link reloadDocument to="/"><h1>POSD System</h1></Link>
            </div>
            <div className='login-button'>
                {isAuth ? (
                    <Link to={"/logout"}>
                        <button>Logout</button>
                    </Link>
                ) : (
                    <Link to={"/login"}>
                        <button>Login</button>
                    </Link>
                )}
            </div>
        </header>
    )
}