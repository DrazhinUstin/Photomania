import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import ErrorPage from './ErrorPage';

const getPhotoIndex = (id, photos) => {
    const photo = photos.find((photo) => photo.id === id);
    return photos.indexOf(photo);
};

const checkIsInFavorites = (items, id) => {
    return items.find((item) => item.id === id) ? true : false;
};

const SinglePhoto = ({ photos, favorites, setFavorites }) => {
    const { id } = useParams();
    const index = getPhotoIndex(id, photos);
    const [inFavorites, setInFavorites] = useState(false);

    useEffect(() => {
        setInFavorites(() => checkIsInFavorites(favorites, id));
    }, [id]);

    useEffect(() => {
        setFavorites((favorites) => {
            if (inFavorites && !checkIsInFavorites(favorites, id)) {
                return [...favorites, photos[index]];
            } else if (!inFavorites) {
                return favorites.filter((item) => item.id !== id);
            } else return favorites;
        });
    }, [inFavorites]);

    if (index === -1) {
        return <ErrorPage />;
    }

    return <Modal {...{ index, photos, inFavorites, setInFavorites }} />;
};

export default SinglePhoto;
