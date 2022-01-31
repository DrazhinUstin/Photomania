import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className='navbar-wrapper'>
            <div className='navbar section-center'>
                <Link to={'.'}>
                    <h1 className='navbar-logo'>photomania</h1>
                </Link>
                <ul className='navbar-menu'>
                    <li>
                        <Link to={'.'}>home</Link>
                    </li>
                    <li>
                        <Link to={'favorites'}>favorites</Link>
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
