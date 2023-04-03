import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import SideBar from "../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import LineGraph from "../components/charts/lineGraph";
import dummyImg1 from '../images/dummyImages/1.jpg';
import ticketMaster from '../images/logos/ticketmaster-logo.png'
import deBlickLogo from '../images/logos/deBlick-logo.svg'
import './style/home.css';
import PieChart from "../components/charts/pieChart";
import BarGraph from "../components/charts/barGraph";

function Compare() {

    const [eventName, setEventName] = useState("Loading")
    const [eventDate, setEventDate] = useState("")
    const [eventPrice, setEventPrice] = useState("")
    const [eventImg, setEventImg] = useState("")

    useEffect(() => {
        axios.get('https://app.ticketmaster.com/discovery/v2/events?apikey=SceNRD9eRjHsgOQYwJPdGWajdha6H11l')
            .then((response) => {

                // console.log(response)
                // setApiData(response.data)

                const eventNo = 10;

                setEventName(response.data._embedded.events[eventNo].products[0].name)
                setEventDate(response.data._embedded.events[eventNo].dates.start.localDate)
                setEventPrice(response.data._embedded.events[eventNo].priceRanges[0].min)
                setEventImg((response.data._embedded.events[eventNo].images[5].url))


            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="mainPage-container">

            <div className="compareContainer homeContainer">
                <div className="home-section1">
                    <div className="hS1-L">
                        <div id="hS1-L-time">Compare</div>
                    </div>
                    <div className="hS1-R">
                        <div id="hS1-R-info">
                            This page compares two different genres represented by 3 different chart elements.<br />
                        </div>
                    </div>
                </div>

                <>
                    <div className="home-section2">
                        <div className="hS2-2_dasboard1">
                            <div className="hS2-2_dasboard1-inner">
                                <div className="home-dash-sec">
                                    PRICES
                                </div>
                                <div className="home-dash-container">
                                    <LineGraph />
                                </div>
                            </div>
                        </div>
                        <div className="home-section2">
                            <div className="hS2-2_dasboard1-inner">
                                <div className="home-dash-sec">
                                    <input type="text" placeholder="Search for event or artist" />
                                </div>
                                <div className="home-dash-container">
                                    {/* <PieChart/> */}
                                    <BarGraph />
                                </div>
                            </div>

                        </div>
                    </div>
                </>

            </div>
        </div>

    )
}

export default Compare