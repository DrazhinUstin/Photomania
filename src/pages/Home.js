import React from 'react';
import SearchForm from '../components/SearchForm';
import Photos from '../components/Photos';

const Home = ({ input, setInput, loading, error, photos, query, searchPhotos }) => {
    return (
        <section className='section section-center'>
            <SearchForm {...{ input, setInput, query, searchPhotos, error }} />
            <Photos photos={photos} loading={loading} />
            {loading && <div className='loading'></div>}
        </section>
    );
};

export default Home;
