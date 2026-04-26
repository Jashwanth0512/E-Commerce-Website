import React from 'react'
import './Navbar.css'
import logo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg.jpg'

const Navbar = () => {
    return (
        <div className='navbar' style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
            <img src={logo} alt="logo" className='nav-logo' style={{height: '60px', marginRight: '16px'}} />
            <div>
                <div style={{fontWeight: 'bold', fontSize: '2rem', letterSpacing: '2px'}}></div>
                <div style={{color: 'orangered', fontWeight: 'bold', fontSize: '1.2rem'}}></div>
            </div>
            <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
                <img src={navProfile} alt="profile" className='nav-profile' style={{height: '48px', borderRadius: '50%'}} />
                <span style={{marginLeft: '8px', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer'}}>&#9660;</span>
            </div>
        </div>
    )
}

export default Navbar;