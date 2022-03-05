import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { getElemHeight } from '../utils';

const Navbar = ({ favorites }) => {
    const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
    const navbarMenuRef = useRef(null);

    const handleClick = (event) => {
        if (!event.target.closest('a')) return;
        setIsNavbarMenuOpen(false);
    };

    useEffect(() => {
        const navbarMenu = navbarMenuRef.current;
        if (isNavbarMenuOpen) {
            navbarMenu.style.height = `${getElemHeight(navbarMenu)}px`;
        } else {
            navbarMenu.style.height = '';
        }
    }, [isNavbarMenuOpen]);

    return (
        <nav className='navbar-wrapper'>
            <div className='navbar section-center' onClick={handleClick}>
                <div className='navbar-header'>
                    <Link to={'.'}>
                        <h1 className='navbar-logo'>photomania</h1>
                    </Link>
                    <button
                        className={`navbar-menu-toggle-btn ${isNavbarMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsNavbarMenuOpen((oldState) => !oldState)}
                    >
                        <span></span>
                    </button>
                </div>
                <ul className='navbar-menu' ref={navbarMenuRef}>
                    <li>
                        <Link to={'.'}>home</Link>
                    </li>
                    <li>
                        <Link to={'about'}>about</Link>
                    </li>
                    <li>
                        <Link to={'favorites'} className='favorites'>
                            favorites
                            <span>{favorites.length}</span>
                        </Link>
                    </li>
                </ul>
                <a
                    style={{ fontSize: '2rem' }}
                    href='https://github.com/DrazhinUstin/Photomania'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <FaGithub />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
