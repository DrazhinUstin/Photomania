import React from 'react';
import { Link } from 'react-router-dom';

const Photos = ({ photos, loading }) => {
    if (!photos.length && !loading) {
        return <p className='alert-message'>No photos to display...</p>;
    }
    return (
        <div className='photos-container'>
            {photos.map((photo, index) => {
                const { id, alt_description, userName, userImage, linkToUser, image, linkToImage } =
                    photo;
                return (
                    <article key={index} className='photo'>
                        <Link to={`photo/${id}`}>
                            <img src={image} alt={alt_description} className='photo-img' />
                        </Link>
                        <footer className='photo-info'>
                            <div>
                                <h4>{userName}</h4>
                                <a
                                    href={linkToImage}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='btn'
                                >
                                    view on unsplash
                                </a>
                            </div>
                            <a href={linkToUser} target='_blank' rel='noopener noreferrer'>
                                <img src={userImage} alt={userName} className='user-img' />
                            </a>
                        </footer>
                    </article>
                );
            })}
        </div>
    );
};

export default Photos;
