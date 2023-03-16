import React from "react";
import SideBar from "../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import LineGraph from "../components/charts/lineGraph";
import dummyImg1 from '../images/dummyImages/1.jpg';
import ticketMaster from '../images/logos/ticketmaster-logo.png'
import deBlickLogo from '../images/logos/deBlick-logo.svg'
import './style/home.css'

function Timeline() {
    return (
        <div className="mainPage-container">
            <div className="compareContainer">
                <div className="home-section1">
                    <div className="hS1-L">
                        <div id="hS1-L-time">Timeline</div>
                    </div>
                    <div className="hS1-R">
                        <div id="hS1-R-info">
                            This page contains a single line graph which shows the timeline of 5 <br/>different attractions during a month.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline