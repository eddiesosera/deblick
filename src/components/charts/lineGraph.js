import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as chartJS,
    LineElement,
    CategoryScale, // x a-xis
    LinearScale, // y axis
    PointElement,
    BarElement
} from 'chart.js';

chartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement
)

function LineGraph() {

    const [eventName, setEventName] = useState("Loading")
    const [eventDate, setEventDate] = useState("")
    const [eventPriceMin, setEventPriceMin] = useState("")
    const [eventPriceMax, setEventPriceMax] = useState("")

    useEffect(() => {
        axios.get('https://app.ticketmaster.com/discovery/v2/events?apikey=SceNRD9eRjHsgOQYwJPdGWajdha6H11l')
            .then((response) => {

                console.log(response)
                // setApiData(response.data)

                const eventNo = 10;

                setEventName(response.data._embedded.events[eventNo].products[0].name)
                setEventDate(response.data._embedded.events[eventNo].dates.start.localDate)
                setEventPriceMin(response.data._embedded.events[eventNo].priceRanges[0].min)
                setEventPriceMax(response.data._embedded.events[eventNo].priceRanges[0].max)

            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const data = {
        labels: ['Minimum', 'Average', 'Maximum'],
        datasets: [
            {
                label: 'Sale og the Week',
                data: [eventPriceMin,(eventPriceMin+eventPriceMax/2),eventPriceMax],
                backgroundColor: '#16E9E9',
                borderColor: '#16E9E9',
                pointBorderColor: '16E9E9'
            }
        ]
    }

    let c = data.datasets[0].data
    console.log(c[0])

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                min: 0,
                max: 300
            }
        }
    }

    return (
        
                    <div className="hS2-2_dasboard1-dsh">
                        <Line className="n123" data={data} options={options}></Line>
                    </div>
                
    )
}

export default LineGraph