import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PolarAreaGraph({chartData, chartOptions}) {
    return (
      <>
      <Doughnut data={chartData} options={chartOptions}/>
      </>
    )
  }
  
  export default PolarAreaGraph