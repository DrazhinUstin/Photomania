import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section className='section section-center' style={{ textAlign: 'center' }}>
            <h2 className='section-title'>Oops! No such page...</h2>
            <Link to={'/'} className='btn'>
                back home
            </Link>
        </section>
    );
};

export default ErrorPage;
