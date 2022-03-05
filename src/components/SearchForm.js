import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchForm = ({ input, setInput, query, searchPhotos, error }) => {
    const inputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!input || input === query) {
            inputRef.current.focus();
        } else {
            searchPhotos(input);
        }
    };

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Search photo'
                autoComplete='off'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={inputRef}
                className={error ? 'error' : ''}
            />
            <button type='submit'>
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchForm;
