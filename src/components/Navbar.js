import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { getElemHeight } from '../utils';

const Navbar = ({ favorites }) => {
    const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
    const navbarMenuRef = useRef(null);

    useEffect(() => {
        const navbarMenu = navbarMenuRef.current;

        const handleClick = (event) => {
            if (event.target.tagName !== 'A') return;
            setIsNavbarMenuOpen(false);
        };

        navbarMenu.addEventListener('click', handleClick);

        return () => navbarMenu.removeEventListener('click', handleClick);
    }, []);

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
            <div className='navbar section-center'>
                <div className='navbar-header'>
                    <Link to={'.'}>
                        <h1 className='navbar-logo'>photomania</h1>
                    </Link>
                    <button
                        className={`navbar-menu-toggle-btn ${isNavbarMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsNavbarMenuOpen((isNavbarMenuOpen) => !isNavbarMenuOpen)}
                    >
                        <span></span>
                    </button>
                </div>
                <ul className='navbar-menu' ref={navbarMenuRef}>
                    <li>
                        <Link to={'.'}>home</Link>
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
