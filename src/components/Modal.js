import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaTimes, FaPlus, FaCheck } from 'react-icons/fa';

const Modal = ({ index, photos, inFavorites, setInFavorites, url }) => {
    const { userName, image, linkToImage, userImage, linkToUser, alt_description } = photos[index];
    const navigate = useNavigate();

    const switchPhoto = (next = true) => {
        next ? index++ : index--;
        if (index > photos.length - 1) index = 0;
        if (index < 0) index = photos.length - 1;
        const targetPhoto = photos[index];
        const targetUrl = `${url}${targetPhoto.id}`;
        navigate(targetUrl);
    };

    return (
        <div className='modal-container'>
            <div className={'modal-overlay'}></div>
            <section className='modal'>
                <header className='modal-header'>
                    <button
                        className={inFavorites ? 'checked' : ''}
                        title={inFavorites ? 'remove from favorites' : 'add to favorites'}
                        onClick={() => setInFavorites((inFavorites) => !inFavorites)}
                    >
                        {inFavorites ? <FaCheck /> : <FaPlus />}
                    </button>
                </header>
                <img src={image} alt={alt_description} className='modal-photo' />
                <footer className='modal-footer'>
                    <div>
                        <a href={linkToUser} target='_blank' rel='noopener noreferrer'>
                            <img src={userImage} alt={userName} className='user-img' />
                        </a>
                        <h4>{userName}</h4>
                    </div>
                    <a
                        href={linkToImage}
                        className='btn'
                        target={'_blank'}
                        rel='noopener noreferrer'
                    >
                        view on unsplash
                    </a>
                </footer>
                <Link to={url} className='modal-close-btn'>
                    <FaTimes />
                </Link>
                {photos.length > 1 && (
                    <div className='modal-controls'>
                        <button onClick={() => switchPhoto(false)}>
                            <FaChevronLeft />
                        </button>
                        <button onClick={() => switchPhoto()}>
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Modal;
