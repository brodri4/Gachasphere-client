import React, { useState } from 'react';

// Components
import NotPlaying from '../components/NotPlaying';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import AddRating from '../components/AddRating';
import AddFilter from '../components/AddFilter';
import { NavLink } from 'react-router-dom';



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
            <NavLink to="/detailed/playing"><h1 className="heading">Currently Playing</h1></NavLink>
            <CurrentlyPlaying />
            <NavLink to="/detailed/not-playing"><h1 className="heading">No Longer Playing</h1></NavLink>
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