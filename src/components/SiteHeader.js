import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userData } from '../helpers';

export default function SiteHeader() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = userData();
    //console.log(user)
    
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
      <div className='auth-buttons'>
        {isAuth ? (
          <>
            <Link to={role === 'amministratore' ? "/amministratore" : "/responsabile"}>
              <button className='area-riservata'>Area Riservata</button>
            </Link>
            <Link to={"/logout"}>
              <button className='logout-button'>Logout</button>
            </Link>
          </>
        ) : (
          <Link to={"/login"}>
            <button className='login-button'>Login</button>
          </Link>
        )}
      </div>
    </header>
  )
}
