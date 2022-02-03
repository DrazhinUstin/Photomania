import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
    FaPlus,
    FaCheck,
    FaDownload,
    FaUnsplash,
} from 'react-icons/fa';
import { triggerFileDownload } from '../utils';

const Modal = ({ index, photos, inFavorites, setInFavorites, setSearhByUser, url }) => {
    const { id, login, userName, image, linkToImage, userImage, linkToUser, alt_description } =
        photos[index];
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
                    <button
                        title='download photo'
                        onClick={() => triggerFileDownload(image, `${id}.jpg`)}
                    >
                        <FaDownload />
                    </button>
                    <a
                        title='view on unsplash'
                        href={linkToImage}
                        target={'_blank'}
                        rel='noopener noreferrer'
                    >
                        <FaUnsplash />
                    </a>
                </header>
                <img src={image} alt={alt_description} className='modal-photo' />
                <footer className='modal-footer'>
                    <div>
                        <a href={linkToUser} target='_blank' rel='noopener noreferrer'>
                            <img src={userImage} alt={userName} className='user-img' />
                        </a>
                        <h4>{userName}</h4>
                    </div>
                    <button className='btn' onClick={() => setSearhByUser(login)}>
                        watch user photos
                    </button>
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
