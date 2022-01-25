import React from 'react';

const Photos = ({ photos }) => {
    return (
        <div className='photos-container'>
            {photos.map((photo) => {
                const { id, alt_description, userName, userImage, linkToUser, image, linkToImage } =
                    photo;
                return (
                    <article key={id} className='photo'>
                        <img src={image} alt={alt_description} className='photo-img' />
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
                                <img src={userImage} alt={userName} />
                            </a>
                        </footer>
                    </article>
                );
            })}
        </div>
    );
};

export default Photos;
