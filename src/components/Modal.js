import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const Modal = ({ index, photos }) => {
    const { userName, image, linkToImage, userImage, linkToUser, alt_description } = photos[index];
    const navigate = useNavigate();

    const switchPhoto = (next = true) => {
        next ? index++ : index--;
        if (index > photos.length - 1) index = 0;
        if (index < 0) index = photos.length - 1;
        const targetPhoto = photos[index];
        const targetUrl = `/photo/${targetPhoto.id}`;
        navigate(targetUrl);
    };

    return (
        <div className='modal-container'>
            <div className={'modal-overlay'}></div>
            <section className='modal'>
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
                <Link to={'/'} className='modal-close-btn'>
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
