import React from 'react';
import Accordion from '../components/Accordion';

const data = [
    {
        id: '1',
        title: 'What is this app for?',
        content:
            'This application is for browsing and searching photos. In it you can find thousands various photos on any subject you want, which you can watch, download, add to favorites and etc.',
    },
    {
        id: '2',
        title: 'Where are the photos taken from?',
        content:
            'All photos in this application are taken from the Unsplash, the internet’s source of freely-usable images. Under each photo you can see a link to the source of the photo and a link to the author of the photo.',
    },
    {
        id: '3',
        title: 'How can I download a photo?',
        content:
            'To download a photo, you have to click on the photo. Then after you go to the photos page, click on the button with the download icon on the top of the page. After that, the download will start.',
    },
    {
        id: '4',
        title: 'What is favorites?',
        content:
            "If you like a certain photo and don't want to search for it again, you can add it to your favorites. Photo will be stored there until you remove it from your favorites. You can also remove all favorites by clicking on the corresponding button on the favorites page.",
    },
    {
        id: '5',
        title: 'How can i add a photo to my favorites?',
        content:
            'To do this, you need to click on the photo. Then, after you go to the photos page, click on the blue button with a plus sign at the top of the page. After that, the photo will be added to your favorites. To delete a photo from favorites, click on the green button with the checkmark icon.',
    },
];

const About = () => {
    return (
        <div className='section section-center'>
            <h2 className='section-title'>about</h2>
            <Accordion data={data} />
            <div style={{ textAlign: 'center' }}>
                <a
                    href='https://github.com/DrazhinUstin/Photomania'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn'
                >
                    View on github
                </a>
            </div>
        </div>
    );
};

export default About;
