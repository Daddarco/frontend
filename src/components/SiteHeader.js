import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userData } from '../helpers';

export default function SiteHeader() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = userData();
    console.log(user)
    
    if (user && user.jwt && user.role) {
      setIsAuth(true);
      setRole(user.role);
    }
  }, []);

  return (
    <header className='site-header'>
      <div className="site-title">
        <Link reloadDocument to="/"><h1>POSD System</h1></Link>
      </div>
      <div className='login-button'>
        {isAuth ? (
          <div>
            <Link to={role === 'amministratore' ? "/amministratore" : "/responsabile"}>
              <button>Area Riseravata</button>
            </Link>
            <Link to={"/logout"}>
              <button>Logout</button>
            </Link>
          </div>
        ) : (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        )}
      </div>
    </header>
  )
}