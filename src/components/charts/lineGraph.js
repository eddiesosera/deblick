import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as chartJS,
    LineElement,
    CategoryScale, // x a-xis
    LinearScale, // y axis
    PointElement
} from 'chart.js';

chartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

function LineGraph() {

    return (
        <div className="App">

        </div>

    )
}

export default LineGraph