import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import LineGraph from "../components/charts/lineGraph";
import dummyImg1 from '../images/dummyImages/1.jpg';
import ticketMaster from '../images/logos/ticketmaster-logo.png'
import deBlickLogo from '../images/logos/deBlick-logo.svg'
import './style/home.css'
import dayjs from 'dayjs'

function Home() {


    const [time, setTime] = useState("")
    let now = dayjs()
    let hour = now.hour(0)

    useEffect(() => {
        // setTime(current_time.substring(0.3))
        let now = dayjs()
        console.log(now.hour() + ":" + now.minute())
        setTime(now.hour() + ":" + now.minute())
    }, [time])


    const [apiData, setApiData] = useState([]);

    const [eventName, setEventName] = useState("Loading")
    const [eventDate, setEventDate] = useState("")
    const [eventPrice, setEventPrice] = useState("")
    const [eventImg, setEventImg] = useState("")

    const [eventName2, setEventName2] = useState("Loading")
    const [eventDate2, setEventDate2] = useState("")
    const [eventPrice2, setEventPrice2] = useState("")
    const [eventImg2, setEventImg2] = useState("")

    const [eventName3, setEventName3] = useState("Loading")
    const [eventDate3, setEventDate3] = useState("")
    const [eventPrice3, setEventPrice3] = useState("")
    const [eventImg3, setEventImg3] = useState("")

    useEffect(() => {
        axios.get('https://app.ticketmaster.com/discovery/v2/events?apikey=SceNRD9eRjHsgOQYwJPdGWajdha6H11l')
            .then((response) => {

                // console.log(response)
                // setApiData(response.data)

                const eventNo = 10;
                const eventNo2 = 1;
                const eventNo3 = 4;

                setEventName(response.data._embedded.events[eventNo].products[0].name)
                setEventDate(response.data._embedded.events[eventNo].dates.start.localDate)
                setEventPrice(response.data._embedded.events[eventNo].priceRanges[0].min)
                setEventImg((response.data._embedded.events[eventNo].images[5].url))

                setEventName2(response.data._embedded.events[eventNo2].products[0].name)
                setEventDate2(response.data._embedded.events[eventNo2].dates.start.localDate)
                setEventPrice2(response.data._embedded.events[eventNo2].priceRanges[0].min)
                setEventImg2((response.data._embedded.events[eventNo2].images[5].url))

                setEventName3(response.data._embedded.events[eventNo3].products[0].name)
                setEventDate3(response.data._embedded.events[eventNo3].dates.start.localDate)
                setEventPrice3(response.data._embedded.events[eventNo3].priceRanges[0].min)
                setEventImg3((response.data._embedded.events[eventNo3].images[5].url))


            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="mainPage-container">
            <div className="homeContainer">

                <div className="home-section1">
                    <div className="hS1-L">
                        <div id="hS1-L-time">{time}</div>
                        <div id="hS1-L-day">Friday, 11 Mar 2023</div>
                    </div>
                    <div className="hS1-R">
                        <div id="hS1-R-logo"><img className="hS1-R-logoItm" src={ticketMaster} alt="TCKMSTR" /><img className="hS1-R-logoItm" src={deBlickLogo} alt="deBlick" /></div>
                        <div id="hS1-R-info"><b>deBlick</b> is a dashboard based on <b>Ticketmaster</b>,<br />a self-service ticketing platform.</div>
                        <button className="hS1-R-btn"><a href="https://www.ticketmaster.com">Learn More <FontAwesomeIcon icon={faArrowRight} className="hS1-R-bIcon" /> </a></button>
                    </div>
                </div>
                <div className="home-section2">
                    <div className="hS2-1">
                        <div className="hS2-1-title home-dash-sec">
                            EVENT
                        </div>
                        <div className="hS2-1-card">
                            <img id="hS2-1-cardImage" src={eventImg} alt="hS2-1-cardImage" />
                            <div className="hS2-1-cardInfo">
                                <div className="hS2-1-cardTitle">{eventName}</div>
                                <br />
                                <div className="hS2-1-cardDate">{eventDate}</div>
                                <div className="hS2-1-cardPrice">USD{eventPrice}</div>
                            </div>
                        </div>
                    </div>
                    <div className="hS2-2_dasboard1">
                        <div className="hS2-2_dasboard1-inner">
                            <div className="home-dash-sec">
                                PRICES($)
                            </div>
                            <div className="home-dash-container">
                                <LineGraph />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="home-section3">
                    <div className="home-section3-header">
                        Upcoming Events
                    </div>
                    <div className="home-section3-eventsContainer">
                        <div className="home-section3-eC-eventItm">
                            <div className="home-section3-eC-eventItmTop-container">
                                <img className="home-section3-eC-eventItm-Img" src={eventImg} alt="" />
                                <div className="home-section3-eC-eventItm-price">
                                    USD{eventPrice}
                                </div>
                            </div>
                            <div className="home-section3-eC-eventItmBtm-container">
                                <div className="home-section3-eC-eventItm-title">
                                    {eventName}
                                </div>
                                <div className="home-section3-eC-eventItm-date">
                                    {eventDate}
                                </div>
                            </div>
                        </div>

                        <div className="home-section3-eC-eventItm">
                            <div className="home-section3-eC-eventItmTop-container">
                                <img className="home-section3-eC-eventItm-Img" src={eventImg2} alt="" />
                                <div className="home-section3-eC-eventItm-price">
                                    USD{eventPrice2}
                                </div>
                            </div>
                            <div className="home-section3-eC-eventItmBtm-container">
                                <div className="home-section3-eC-eventItm-title">
                                    {eventName2}
                                </div>
                                <div className="home-section3-eC-eventItm-date">
                                    {eventDate2}
                                </div>
                            </div>
                        </div>

                        <div className="home-section3-eC-eventItm">
                            <div className="home-section3-eC-eventItmTop-container">
                                <img className="home-section3-eC-eventItm-Img" src={eventImg3} alt="" />
                                <div className="home-section3-eC-eventItm-price">
                                    USD{eventPrice3}
                                </div>
                            </div>
                            <div className="home-section3-eC-eventItmBtm-container">
                                <div className="home-section3-eC-eventItm-title">
                                    {eventName3}
                                </div>
                                <div className="home-section3-eC-eventItm-date">
                                    {eventDate3}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home