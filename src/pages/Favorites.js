import React from 'react';
import { Link } from 'react-router-dom';
import Photos from '../components/Photos';

const Favorites = ({ favorites, setFavorites }) => {
    if (!favorites.length) {
        return (
            <section className='section section-center' style={{ textAlign: 'center' }}>
                <p className='alert-message'>You have no favorites yet...</p>
                <Link to={'/'} className='btn'>
                    add favorites
                </Link>
            </section>
        );
    }

    return (
        <section className='section section-center'>
            <h2 className='section-title'>your favorites</h2>
            <Photos photos={favorites} url={'/favorites/'} />
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <button className='btn red' onClick={() => setFavorites([])}>
                    remove all
                </button>
            </div>
        </section>
    );
};

export default Favorites;
