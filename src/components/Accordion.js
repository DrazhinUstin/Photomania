import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { getElemHeight } from '../utils';

const Accordion = ({ data }) => {
    const accordionRef = useRef(null);

    useEffect(() => {
        const accordion = accordionRef.current;

        const listenResize = () => {
            [...accordion.children].forEach((child) => {
                if (!child.classList.contains('active')) return;
                const childFooter = child.lastElementChild;
                childFooter.style.height = `${getElemHeight(childFooter)}px`;
            });
        };

        window.addEventListener('resize', listenResize);

        return () => window.removeEventListener('resize', listenResize);
    }, []);

    return (
        <ul className='accordion' ref={accordionRef}>
            {data.map((item) => {
                return <AccordionItem key={item.id} {...item} />;
            })}
        </ul>
    );
};

const AccordionItem = ({ title, content }) => {
    const [isItemActive, setIsItemActive] = useState(false);
    const itemFooterRef = useRef(null);

    useEffect(() => {
        const itemFooter = itemFooterRef.current;
        if (isItemActive) {
            itemFooter.style.height = `${getElemHeight(itemFooter)}px`;
        } else {
            itemFooter.style.height = '';
        }
    }, [isItemActive]);

    return (
        <li className={`accordion-item ${isItemActive && 'active'}`}>
            <header
                className='accordion-item-header'
                onClick={() => setIsItemActive((isItemActive) => !isItemActive)}
            >
                <p>{title}</p>
                <FaChevronDown />
            </header>
            <footer className='accordion-item-footer' ref={itemFooterRef}>
                <div>
                    <p>{content}</p>
                </div>
            </footer>
        </li>
    );
};

export default Accordion;
