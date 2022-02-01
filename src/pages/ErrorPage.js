import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ErrorPic } from '../assets/404-pic.svg';

const ErrorPage = () => {
    return (
        <section className='section section-center' style={{ textAlign: 'center' }}>
            <h2 className='section-title'>Oops! No such page...</h2>
            <ErrorPic className='error-img' />
            <Link to={'/'} className='btn'>
                back home
            </Link>
        </section>
    );
};

export default ErrorPage;
