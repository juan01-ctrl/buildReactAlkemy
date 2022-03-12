import React from 'react'
import { Link } from 'react-router-dom';

const Logout = () => {


    const handleLogout = () =>{

        localStorage.removeItem('token-x');  
       
    }
  return (
    <div>
        <Link onClick={handleLogout} className="logout-button" to='/'>Logout</Link>
    </div>
  )
}

export default Logout