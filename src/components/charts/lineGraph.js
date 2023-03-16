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

    // const [apiData, setApiData] = useState([]);

    // const [missionName, setMissionName] = useState("Loading")
    // const [missionPatch, setMissionPatch] = useState("")
    // const [launchYear, setLaunchYear] = useState("")
    // const [launchSuccess, setLaunchSuccess] = useState("")

    // let [apiIndex, setApiIndex] = useState(0)

    // useEffect(() => {
    //     axios.get('https://app.ticketmaster.com/discovery/v2/events.json?keyword=Barclays&apikey=SceNRD9eRjHsgOQYwJPdGWajdha6H11l')
    //         .then((response) => {
    //             console.log(response)
    //             let index = apiIndex;
    //             setApiData(response.data)
    //             setMissionName(response.data[0].mission_name)
    //             setMissionPatch(response.data[0].links.mission_patch)
    //             setLaunchYear(response.data[0].launch_year)
    //             if (response.data[0].launch_succes) {
    //                 setLaunchSuccess("Success")
    //             } else {
    //                 setLaunchSuccess("Failed")
    //             }

    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [apiIndex])

    const data = {
        labels: ['Mon', 'Tue', 'Wed', ],
        datasets: [
            {
                label: 'Sale og the Week',
                data: [3,6,9],
                backgroundColor: '#16E9E9',
                borderColor: '#16E9E9',
                pointBorderColor: '16E9E9'
            }
        ]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                min: 3,
                max: 9
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