import React from 'react';

// Components
import FreeToPlay from '../components/FreeToPlay';
import AvgRating from '../components/AvgRating';
import Popularity from '../components/Popularity';



function MyLists(props) {

    return (
        <div>
            <div className="homepage-heading">
                <h1 className="heading">World of Anime Mobile Gaming</h1>
            </div>
            <ul className='homepage-category-container'>
                <li className='homepage-category_li'>
                    <h2 className="secondary-heading">Popular Games</h2>
                    <Popularity />
                </li>
                <li className='homepage-category_li'>
                    <h2 className="secondary-heading">Top Free To Play</h2>
                    <FreeToPlay />
                </li>
                <li className='homepage-category_li'>
                    <h2 className="secondary-heading">Highest Rated</h2>
                    <AvgRating />
                </li>
            </ul>
        </div>
    );
}

export default MyLists;