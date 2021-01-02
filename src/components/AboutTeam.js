import React from 'react';
import abbey from "../images/abbey.jpg";
import jonathan from '../images/jnuno-profile.png';
import hung from '../images/hung.JPG';
import boris from '../images/boris.jpg';
import { ReactComponent as ChromeLogo } from '../images/chrome.svg';
import { ReactComponent as GithubLogo } from '../images/github.svg';
import { ReactComponent as LinkedinLogo } from '../images/linkedin.svg';
import { ReactComponent as TwitterLogo } from '../images/twitter.svg';

function AboutTeam() {
    return (
        <div className="team">
            <div className="team_card" tabIndex="0">
                <div className="team_card_inner">
                    <div className="team_card_inner_front">
                        <div className="image-cropper">
                            <img className="headshot" src={boris} alt="headshot of Borinquen 'Boris' Rodriguez"></img>
                        </div>
                        <h4 className="team_card_inner_front_name">Borinquen "Boris" Rodriguez</h4>
                    </div>
                    <div className="team_card_inner_back">
                        <p>Boris is a Mobile Gaming Influencer turned Software Developer looking to create innovative and exciting applications.</p>
                        <a href="https://www.linkedin.com/in/brodri4/" target="_blank" rel="noreferrer"><LinkedinLogo className="linkIcon" alt="LinkedIn logo link to LinkedIn profile"/></a> 
                        <a href="https://github.com/brodri4" target="_blank" rel="noreferrer"><GithubLogo className="linkIcon" alt="Github logo link to github profile"/></a>
                        <a href="http://borinquen-rodriguez-portfolio.surge.sh/" target="_blank" rel="noreferrer"><ChromeLogo className="linkIcon" alt="Chrome logo link to portfolio"/></a>
                        <a href="https://twitter.com/Brodri4" target="_blank" rel="noreferrer"><TwitterLogo className="linkIcon" alt="Twitter logo link to Twitter profile"/></a>
                    </div>
                </div>
            </div>
            <div className="team_card" tabIndex="0">
                <div className="team_card_inner">
                    <div className="team_card_inner_front">
                        <div className="image-cropper">
                            <img className="headshot" src={abbey} alt="headshot of Abbey Perini"></img>
                        </div>
                        <h4 className="team_card_inner_front_name">Abbey Perini</h4>
                    </div>
                    <div className="team_card_inner_back">
                        <p>Abbey is a passionate Full-Stack Web Developer looking for projects with lots of problems to solve.</p> 
                        <a href="https://www.linkedin.com/in/abigail-perini/" target="_blank" rel="noreferrer"><LinkedinLogo className="linkIcon" alt="LinkedIn logo link to LinkedIn profile"/></a> 
                        <a href="https://github.com/abbeyperini" target="_blank" rel="noreferrer"><GithubLogo className="linkIcon" alt="Github logo link to github profile"/></a>
                        <a href="https://abbeyperini.github.io/portfolio.html" target="_blank" rel="noreferrer"><ChromeLogo className="linkIcon" alt="Chrome logo link to portfolio"/></a>
                        <a href="https://twitter.com/AbbeyPerini" target="_blank" rel="noreferrer"><TwitterLogo className="linkIcon" alt="Twitter logo link to Twitter profile"/></a>
                    </div>
                </div>
            </div>
            <div className="team_card" tabIndex="0">
                <div className="team_card_inner">
                    <div className="team_card_inner_front">
                        <div className="image-cropper">
                            <img className="headshot" src={hung} alt="headshot of Hung Tran"></img>
                        </div>
                        <h4 className="team_card_inner_front_name">Hung Tran</h4>
                    </div>
                    <div className="team_card_inner_back">
                        <p>Hung is...</p>
                        <a href="https://www.linkedin.com/in/hungtran0713/" target="_blank" rel="noreferrer"><LinkedinLogo className="linkIcon" alt="LinkedIn logo link to LinkedIn profile"/></a> 
                        <a href="https://github.com/hptran7" target="_blank" rel="noreferrer"><GithubLogo className="linkIcon" alt="Github logo link to github profile"/></a>
                        <a href="https://hptran7.github.io/Porfolio/" target="_blank" rel="noreferrer"><ChromeLogo className="linkIcon" alt="Chrome logo link to portfolio"/></a>
                    </div>
                </div>
            </div>
            <div className="team_card" tabIndex="0">
                <div className="team_card_inner">
                    <div className="team_card_inner_front">
                        <div className="image-cropper">
                            <img className="headshot" src={jonathan} alt="headshot of Jonathan Nuno"></img>
                        </div>
                        <h4 className="team_card_inner_front_name">Jonathan Nuno</h4>
                        </div>
                    <div className="team_card_inner_back">
                        <p>Jonathan is a Full-Stack Web Developer whose always looking for a puzzle to solve!</p>
                        <a href="https://www.linkedin.com/in/jonathannuno/" target="_blank" rel="noreferrer"><LinkedinLogo className="linkIcon" alt="LinkedIn logo link to LinkedIn profile"/></a> 
                        <a href="https://github.com/Jonathan-Nuno" target="_blank" rel="noreferrer"><GithubLogo className="linkIcon" alt="Github logo link to github profile"/></a>
                        <a href="https://jonathan-nuno.dev/" target="_blank" rel="noreferrer"><ChromeLogo className="linkIcon" alt="Chrome logo link to portfolio"/></a>
                    </div>
                </div>
            </div>
            {/* <div className="team_card" tabIndex="0">
                <div className="team_card_inner">
                    <div className="team_card_inner_front">
                        <div className="image-cropper">
                            <img className="headshot" src={tom} alt="headshot of Thomas McGuire"></img>
                        </div>
                        <h4 className="team_card_inner_front_name">Thomas McGuire</h4>
                        </div>
                    <div className="team_card_inner_back">
                        <p>Tom is...</p>
                        <a href="#" target="_blank" rel="noreferrer"><LinkedinLogo className="linkIcon" alt="LinkedIn logo link to LinkedIn profile"/></a> 
                        <a href="#" target="_blank" rel="noreferrer"><GithubLogo className="linkIcon" alt="Github logo link to github profile"/></a>
                        <a href="#" target="_blank" rel="noreferrer"><ChromeLogo className="linkIcon" alt="Chrome logo link to portfolio"/></a>
                        <a href="#" target="_blank" rel="noreferrer"><TwitterLogo className="linkIcon" alt="Twitter logo link to Twitter profile"/></a>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default AboutTeam;