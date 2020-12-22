import React from 'react';

// Components
import NotPlaying from '../components/NotPlaying';
import CurrentlyPlaying from '../components/CurrentlyPlaying';



function MyLists(props) {

    return (
        <div>
            <CurrentlyPlaying />
            <NotPlaying />
        </div>
    );
}

export default MyLists;