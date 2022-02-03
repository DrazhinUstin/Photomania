import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollTopBtn from './components/ScrollTopBtn';
import Home from './pages/Home';
import SinglePhoto from './pages/SinglePhoto';
import Favorites from './pages/Favorites';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import { destructPhotos, getDocumentHeight, getStorageItem, setStorageItem } from './utils';
const API_KEY = process.env.REACT_APP_ACCESS_KEY;

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('photos');
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [isPhotosOver, setIsPhotosOver] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [favorites, setFavorites] = useState(getStorageItem('favorites'));
    const location = useLocation();
    const navigate = useNavigate();

    const getPhotos = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.errors) {
                setPhotos([]);
                throw new Error(data.errors);
            }
            const newPhotos = destructPhotos(data.results || data);
            if (page === 1) {
                !newPhotos.length ? setError(true) : setError(false);
                setPhotos(newPhotos);
                setIsPhotosOver(false);
            } else {
                !newPhotos.length ? setIsPhotosOver(true) : setIsPhotosOver(false);
                setPhotos((photos) => [...photos, ...newPhotos]);
            }
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    };

    const setSearhByUser = (login) => {
        if (query !== login) {
            setSearch('photosByUser');
            setQuery(login);
            setPage(1);
        }
        navigate('/');
    };

    useEffect(() => {
        const url = 'https://api.unsplash.com';
        let fullUrl;
        switch (search) {
            case 'photos':
                fullUrl = `${url}/photos?client_id=${API_KEY}&page=${page}`;
                if (query) {
                    fullUrl = `${url}/search/photos?client_id=${API_KEY}&page=${page}&query=${query}`;
                }
                getPhotos(fullUrl);
                break;
            case 'photosByUser':
                if (query) {
                    fullUrl = `${url}/users/${query}/photos?client_id=${API_KEY}&page=${page}`;
                    getPhotos(fullUrl);
                }
                break;
        }
    }, [search, page, query]);

    useEffect(() => {
        const isCorrectlocation = () => (location.pathname === '/' ? true : false);
        const handleScroll = () => {
            if (error || loading || isPhotosOver || !isCorrectlocation()) return;
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
                    element={
                        <Home
                            {...{ loading, error, photos, query, setQuery, setPage, setSearch }}
                        />
                    }
                />
                <Route
                    path={':id'}
                    element={
                        <SinglePhoto {...{ photos, favorites, setFavorites, setSearhByUser }} />
                    }
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
                            {...{ favorites, setFavorites, setSearhByUser }}
                        />
                    }
                ></Route>
                <Route path='about' element={<About />} />
                <Route path={'*'} element={<ErrorPage />} />
            </Routes>
            <ScrollTopBtn />
        </>
    );
};

export default App;
