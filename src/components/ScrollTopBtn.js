import React, { useState, useEffect } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';

const ScrollTopBtn = () => {
    const [isBtnShowing, setIsBtnShowing] = useState(false);

    useEffect(() => {
        const listenScroll = () => {
            window.pageYOffset > document.documentElement.clientHeight
                ? setIsBtnShowing(true)
                : setIsBtnShowing(false);
        };

        window.addEventListener('scroll', listenScroll);

        return () => window.removeEventListener('scroll', listenScroll);
    }, []);

    return (
        <button
            className={`scroll-top-btn ${isBtnShowing && 'show'}`}
            onClick={() => window.scrollTo(0, 0)}
        >
            <FaAngleDoubleUp />
        </button>
    );
};

export default ScrollTopBtn;
