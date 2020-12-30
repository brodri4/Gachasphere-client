import React, { useState } from 'react';
import AboutFilter from '../components/AboutFilter';
import AboutGacha from '../components/AboutGacha';
import AboutGachasphere from '../components/AboutGachasphere';
import AboutTeam from '../components/AboutTeam';

function About() {
    const [activeComponentGS, setActiveComponentGS] = useState("collapsed-about-gs");
    const [activeComponentG, setActiveComponentG] = useState("collapsed-about-gacha");
    const [activeComponentTeam, setActiveComponentTeam] = useState("collapsed-team");

    const handleOnClickGS = () => {
        if (activeComponentGS === "collapsed-about-gs") {
            setActiveComponentGS("about-gs");
        } else if (activeComponentGS === "about-gs") {
            setActiveComponentGS("collapsed-about-gs");
        }
    }

    const handleOnClickG = () => {
        if (activeComponentG === "collapsed-about-gacha") {
            setActiveComponentG("about-gacha");
        } else if (activeComponentG === "about-gacha") {
            setActiveComponentG("collapsed-about-gacha");
        }
    }

    const handleOnClickTeam = () => {
        if (activeComponentTeam === "collapsed-team") {
            setActiveComponentTeam("about-team");
        } else if (activeComponentTeam === "about-team") {
            setActiveComponentTeam("collapsed-team");
        }
    }

    return (
        <div className="about-page">
            <div className="about-page_heading">
                <h1 className="heading">World of Anime Mobile Gaming</h1>
            </div>
            <button className="collapsible" onClick={handleOnClickGS}>{activeComponentGS === "collapsed-about-gs" ? '+' : '-'} About Gachasphere</button>
            <AboutFilter active={activeComponentGS}>
                <AboutGachasphere name="about-gs"/>
                <div name="collapsed-about-gs"></div>
            </AboutFilter>
            <button className="collapsible" onClick={handleOnClickG}>{activeComponentG === "collapsed-about-gacha" ? '+' : '-'} About Gacha Games</button>
            <AboutFilter active={activeComponentG}>
                <AboutGacha name="about-gacha"/>
                <div name="collapsed-about-gacha"></div>
            </AboutFilter>
            <button className="collapsible" onClick={handleOnClickTeam}>{activeComponentTeam === "collapsed-team" ? '+' : '-'} About the Team</button>
            <AboutFilter active={activeComponentTeam}>
                <AboutTeam name="about-team"/>
                <div name="collapsed-team"></div>
            </AboutFilter>
        </div>
    )
}

export default About;