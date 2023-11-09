import React, { Component } from "react";
import { useState } from "react-router-dom";
import { useRef, useEffect } from "react";
import './sideBar.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faFutbol, faCodeCompare, faCircleHalfStroke, faChartLine } from '@fortawesome/free-solid-svg-icons'
import deBlickLogo from '../../data/images/logos/deBlick-logo.svg'

function SideBar() {

    const ref = useRef();
    const comp = useRef();
    const time = useRef();

    function changePage() {
        console.log('className 👉️', ref.current.className);

        if (ref.current.classList.contains('activePage') && window.location.pathname === "/") {
            ref.current.classList.add('activePage');
            ref.current.classList.remove('inActivePage');
        } else {
            ref.current.classList.add('activePage');
            ref.current.classList.remove('inActivePage');
            comp.current.classList.remove('activePage')
            time.current.classList.remove('activePage')
            comp.current.classList.add('inActivePage')
            time.current.classList.add('inActivePage')
        }
    }


    function changePage2() {

        console.log('className 👉️', comp.current.className);

        if (comp.current.classList.contains('activePage')) {
            comp.current.classList.add('activePage');
            comp.current.classList.remove('inActivePage');
        } else {
            comp.current.classList.add('activePage');
            comp.current.classList.remove('inActivePage');
            ref.current.classList.remove('activePage')
            time.current.classList.remove('activePage')
            ref.current.classList.add('inActivePage')
            time.current.classList.add('inActivePage')

        }
    }

    function changePage3() {

        console.log('className 👉️', time.current.className);

        if (time.current.classList.contains('activePage')) {
            time.current.classList.add('activePage');
            time.current.classList.remove('inActivePage');
        } else {
            time.current.classList.add('activePage');
            time.current.classList.remove('inActivePage');
            ref.current.classList.remove('activePage')
            comp.current.classList.remove('activePage')
            ref.current.classList.add('inActivePage')
            comp.current.classList.add('inActivePage')

            changePage3()
        }
    };

    return (
        <div className="mainSB" style={{ marginTop: '-20px' }} onLoad={changePage3}>
            <div className="sideBar-container">

                <div className="sideBar-section1" style={{ color: '#F2F6F9' }}>
                    <div className="sideBar-nameChar">T</div>
                    Tsungai
                </div>

                <div className="sideBar-section2">
                    <Link to="/">
                        <div id="s2item" className="#s2item sideBar-s2item sideBar-homeContainer activePage" ref={ref} onClick={changePage}>
                            <FontAwesomeIcon icon={faFutbol} className="s2-icon" />
                            <div className="s2-text" id="home-text">Home</div>
                        </div>
                    </Link>
                    <Link to="/compare">
                        <div id="s2item" className="#s2item sideBar-s2item sideBar-compareContainer inActivePage" ref={comp} onClick={changePage2}>
                            <FontAwesomeIcon icon={faCircleHalfStroke} className="s2-icon" />
                            <div className="s2-text" id="compare-text">Compare</div>
                        </div>
                    </Link>
                    <Link to="/timeline">
                        <div id="s2item" className="#s2item sideBar-s2item sideBar-compareContainer inActivePage" ref={time} onClick={changePage3}>
                            <FontAwesomeIcon icon={faChartLine} className="s2-icon" />
                            <div className="s2-text" id="compare-text">Timeline</div>
                        </div>
                    </Link>
                </div>

                <div className="sideBar-section3">
                    <img className="sideBar-logo" src={deBlickLogo} alt="logo" />
                    <div className="sideBar-logoText" style={{ color: '#F2F6F9' }}>deBlick</div>
                </div>

            </div>
        </div>
    )
}

export default SideBar