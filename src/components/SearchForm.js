import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchForm = ({ query, setQuery, setPage, error }) => {
    const queryDOM = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = queryDOM.current.value;
        if (!value || value === query) {
            queryDOM.current.focus();
        } else {
            setQuery(value);
            setPage(1);
        }
    };

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Search photo'
                autoComplete='off'
                ref={queryDOM}
                className={error ? 'error' : ''}
            />
            <button type='submit'>
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchForm;
