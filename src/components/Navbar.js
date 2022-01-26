import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className='navbar-wrapper'>
            <div className='navbar section-center'>
                <h1 className='navbar-logo'>photomania</h1>
                <a
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
