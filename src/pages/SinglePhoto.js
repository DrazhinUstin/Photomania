import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ErrorPage from './ErrorPage';

const getPhotoIndex = (id, photos) => {
    const photo = photos.find((photo) => photo.id === id);
    return photos.indexOf(photo);
};

const checkIsInFavorites = (items, id) => {
    return items.find((item) => item.id === id) ? true : false;
};

const SinglePhoto = ({ photos, favorites, setFavorites, url = '/' }) => {
    const { id } = useParams();
    const index = getPhotoIndex(id, photos);
    const [inFavorites, setInFavorites] = useState(checkIsInFavorites(favorites, id));
    const navigate = useNavigate();

    useEffect(() => {
        setInFavorites(() => checkIsInFavorites(favorites, id));
    }, [id]);

    useEffect(() => {
        setFavorites((favorites) => {
            if (inFavorites && !checkIsInFavorites(favorites, id)) {
                return [...favorites, photos[index]];
            } else if (!inFavorites && checkIsInFavorites(favorites, id)) {
                return favorites.filter((item) => item.id !== id);
            } else return favorites;
        });
        if (url === '/favorites/' && !inFavorites) navigate(url);
    }, [inFavorites]);

    if (index === -1) {
        return <ErrorPage />;
    }

    return <Modal {...{ index, photos, inFavorites, setInFavorites, url }} />;
};

export default SinglePhoto;
