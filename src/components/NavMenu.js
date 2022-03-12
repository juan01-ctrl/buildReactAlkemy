import React from 'react'
import Logout from './Logout'
import Logo from '../assets/logo.svg'
const NavMenu = ({setSearch}) => {
  return (
    <nav className='nav__menu'>
        <img className="logo" src={Logo} alt="logo" />
        <Logout/>
    </nav>
  )
}

export default NavMenu