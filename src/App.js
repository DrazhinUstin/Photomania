import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SinglePhoto from './pages/SinglePhoto';
import Favorites from './pages/Favorites';
import ErrorPage from './pages/ErrorPage';
import { destructPhotos, getDocumentHeight, getStorageItem, setStorageItem } from './utils';
const API_KEY = process.env.REACT_APP_ACCESS_KEY;

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [photos, setPhotos] = useState([]);
    const [favorites, setFavorites] = useState(getStorageItem('favorites'));
    const location = useLocation();

    const getPhotos = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors);
            }
            const newPhotos = destructPhotos(data.results || data);
            if (page === 1) {
                !newPhotos.length ? setError(true) : setError(false);
                setPhotos(newPhotos);
            } else {
                setPhotos((photos) => [...photos, ...newPhotos]);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const url = 'https://api.unsplash.com';
        let fullURL = `${url}/photos?client_id=${API_KEY}&page=${page}`;
        if (query) {
            fullURL = `${url}/search/photos?client_id=${API_KEY}&page=${page}&query=${query}`;
        }
        getPhotos(fullURL);
    }, [page, query]);

    useEffect(() => {
        const isCorrectlocation = () => (location.pathname === '/' ? true : false);
        const handleScroll = () => {
            if (error || loading || !isCorrectlocation()) return;
            const documentHeight = getDocumentHeight();
            const windowHeight = document.documentElement.clientHeight;
            if (windowHeight + window.pageYOffset >= documentHeight) {
                setPage((page) => page + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        setStorageItem('favorites', favorites);
    }, [favorites]);

    return (
        <>
            <Navbar favorites={favorites} />
            <Routes>
                <Route
                    path={'/'}
                    element={<Home {...{ loading, error, photos, query, setQuery, setPage }} />}
                />
                <Route
                    path={':id'}
                    element={<SinglePhoto {...{ photos, favorites, setFavorites }} />}
                />
                <Route
                    path={'favorites'}
                    element={<Favorites {...{ favorites, setFavorites }} />}
                />
                <Route
                    path={'favorites/:id'}
                    element={
                        <SinglePhoto
                            photos={favorites}
                            url={'/favorites/'}
                            {...{ favorites, setFavorites }}
                        />
                    }
                ></Route>
                <Route path={'*'} element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default App;
