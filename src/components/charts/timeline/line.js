import React from 'react';
import {Line} from 'react-chartjs-2';
import {Title} from 'chart.js';

import { Chart as ChartJS, CategoryScale, PointElement, LinearScale, LineElement, Tooltip, Legend } from "chart.js";
ChartJS.register( CategoryScale, PointElement, LineElement, LinearScale, Tooltip, Legend);

ChartJS.register(
  Title);


function LineGraph({chartData, chartOptions}) {
  return (
    <>
    <Line data={chartData} options={chartOptions}/>
    </>
  )
}

export default LineGraph