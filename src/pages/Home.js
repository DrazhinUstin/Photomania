import React from 'react';
import SearchForm from '../components/SearchForm';
import Photos from '../components/Photos';

const Home = ({ loading, error, photos, query, setQuery, setPage }) => {
    return (
        <section className='section section-center'>
            <SearchForm query={query} setQuery={setQuery} setPage={setPage} error={error} />
            <Photos photos={photos} loading={loading} />
            {loading && <div className='loading'></div>}
        </section>
    );
};

export default Home;
