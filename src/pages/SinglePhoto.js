import React from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import ErrorPage from './ErrorPage';

const getPhotoIndex = (id, photos) => {
    const photo = photos.find((photo) => photo.id === id);
    return photos.indexOf(photo);
};

const SinglePhoto = ({ photos }) => {
    const { id } = useParams();
    const index = getPhotoIndex(id, photos);

    if (index === -1) {
        return <ErrorPage />;
    }

    return <Modal {...{ index, photos }} />;
};

export default SinglePhoto;
