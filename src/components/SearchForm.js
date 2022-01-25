import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <input type='text' placeholder='Search photo' autoComplete='off' />
            <button type='submit'>
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchForm;
