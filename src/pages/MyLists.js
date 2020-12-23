import React, { useState } from 'react';

// Components
import NotPlaying from '../components/NotPlaying';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import AddRating from '../components/AddRating';
import AddFilter from '../components/AddFilter';



function MyLists(props) {
    const [activeComponent, setActiveComponent] = useState("nada")
    
    const handleOnClick = () => {
        if (activeComponent === "nada") {
            setActiveComponent("AddRating")
        } else if (activeComponent === "AddRating") {
            setActiveComponent("nada")
        }
    }

    return (
        <div className='myLists-container'>
            <h1 className="heading">Currently Playing</h1>
            <CurrentlyPlaying />
            <h1 className="heading">No Longer Playing</h1>
            <NotPlaying />
            <button onClick={handleOnClick} className="secondary-button">Add Rating</button>
            <AddFilter active={activeComponent}>
                <AddRating name="AddRating"/>
                <div name="nada"></div>
            </AddFilter>

        </div>
    );
}

export default MyLists;