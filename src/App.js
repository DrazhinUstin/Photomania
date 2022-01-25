import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import Photos from './components/Photos';
import { destructPhotos } from './utils';
const API_KEY = process.env.REACT_APP_ACCESS_KEY;

const App = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState([]);

    const getPhotos = async () => {
        const url = `https://api.unsplash.com/photos?client_id=${API_KEY}&page=${page}`;
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!data.errors) {
                const newPhotos = destructPhotos(data);
                setPhotos(newPhotos);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <section className='section section-center'>
            <SearchForm />
            <Photos photos={photos} />
            {loading && <div className='loading'></div>}
        </section>
    );
};

export default App;
