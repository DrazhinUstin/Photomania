import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import Photos from './components/Photos';
import { destructPhotos, getDocumentHeight } from './utils';
const API_KEY = process.env.REACT_APP_ACCESS_KEY;

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [photos, setPhotos] = useState([]);

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
        const handleScroll = () => {
            if (error || loading) return;
            const documentHeight = getDocumentHeight();
            const windowHeight = document.documentElement.clientHeight;
            if (windowHeight + window.pageYOffset >= documentHeight) {
                setPage((page) => page + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return (
        <>
            <Navbar />
            <section className='section section-center'>
                <SearchForm query={query} setQuery={setQuery} setPage={setPage} error={error} />
                <Photos photos={photos} loading={loading} />
                {loading && <div className='loading'></div>}
            </section>
        </>
    );
};

export default App;
