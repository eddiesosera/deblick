import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import LineGraph from '../components/charts/timeline/line';
import { Button } from 'bootstrap';
import { countries } from '../data/countries';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { selectYearList } from '../data/toYear';




function Timeline() {

    const apiKey = 'aa0feba793eab9ed9931e30af01f28ecba33f0be36e09853905ebbf976d57753';

    const [matchScore, setMatchScore] = useState([0, 0, 0]);
    const [match_HT_Score, setMatch_HT_Score] = useState([0, 0, 0]);
    const [match_OtherScore, setMatch_OtherScore] = useState([0, 0, 0])
    const [matchCards, setMatchCards] = useState([0, 0, 0]);
    const [matchGoalScorer, setMatchGoalScorer] = useState([0, 0, 0]);
    const [matchDate, setMatchDate] = useState(['2019-01-01', '2020-01-01', '2021-01-01']);

    const [teamId, setTeamId] = useState(73)
    const [countryId, setCountryId] = useState(1)
    const [leagueId, seLeagueId] = useState(1)

    const [fromDate, setFromDate] = useState(2020)
    let toDateVal = (parseInt(fromDate) + 5)
    const [toDate, setToDate] = useState(toDateVal)

    useEffect(() => {
        axios.get('https://apiv3.apifootball.com/?action=get_leagues&APIkey=' + apiKey)
            .then((res) => {

                console.log(countries)

            })
    }, [])

    // Match results
    useEffect(() => {
        axios.get('https://apiv3.apifootball.com/?action=get_events&from=' + fromDate + '-01-01&to=2023-10-01&team_id=' + teamId + '&APIkey=' + apiKey)
            .then((res) => {

                let matchData = res.data
                console.log(matchData)

                setMatchScore(matchData.map((goals) => goals.match_awayteam_score));
                setMatch_HT_Score(matchData.map((goals) => goals.match_awayteam_halftime_score));
                setMatch_OtherScore(matchData.map((goals) => goals.match_hometeam_score));
                setMatchCards(matchData.map((cards) => (cards.cards).length));
                setMatchGoalScorer(matchData.map((scorers) => (scorers.goalscorer).length));
                setMatchDate(matchData.map((date) => date.match_date))

                console.log(toDateVal)

            })
    }, [fromDate, toDate, toDateVal, teamId])

    //Get teams
    const [leagueID, setLeagueID] = useState(302)
    const [leagueName, setLeagueName] = useState('La Liga')
    const [teamsList, setTeamsList] = useState([])

    useEffect(() => {
        axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=' + leagueID + '&APIkey=' + apiKey)
            .then((teams) => {

                console.log(teams.data)
                const teamsList = teams.data
                setTeamsList(teamsList)

            })
    }, [leagueID])

    // Select Team
    const teamOptions = useRef()
    const [selectTeam, setSelectTeam] = useState('Atletico Madrid')

    const changeTeam = (e) => {

        const selectedTeam = e.target.value;
        const selectedTeamObj = teamsList.filter((team) => team.team_key === selectedTeam.key)
        //console.log(selectedTeamObj)

        setTeamId(e.target.value)
        console.log(e.target.value)

    }

    //Update name
    const [updateSelectedTeam, setUpdateSelectedTeam] = useState('Atletico Madrid')
    useEffect(() => {
        axios.get('https://apiv3.apifootball.com/?action=get_teams&team_id=' + teamId + '&APIkey=' + apiKey)
            .then((teamSelectedData) => {

                let teamSelected = teamSelectedData.data[0]
                console.log(teamSelectedData)
                setUpdateSelectedTeam(teamSelected.team_name)
            })
    }, [teamId])


    //Select Year
    const yearOptions = useRef()
    const [selectYear, setSelectYear] = useState(2020)


    //Change League
    const changeLeague = (e) => {
        setLeagueName(e.target.value)
        const selectedLeague = e.target.value;

        if (selectedLeague === 'Barclays Premier Leauge') {
            setLeagueID(152)
        } else
            if (selectedLeague === 'La Liga') {
                setLeagueID(302)
            } else
                if (selectedLeague === 'Bundesliga') {
                    setLeagueID(171)
                }

        console.log(e.target.key)

    }


    //Default graph data
    const [matchDetails, setMatchDetails] = useState({
        labels: matchDate,
        color: ["red", "yellow", 'green'],
        datasets: [{
            label: "Score",
            data: matchScore,
            tension: 0.4,
            backgroundColor: 'green',
        },
        {
            label: "Halftime Score",
            data: match_HT_Score,
            tension: 0.4,
            //backgroundColor: ["red", "teal", "green"],
        },
        {
            label: "Other team Score",
            data: match_OtherScore,
            tension: 0.4,
            //backgroundColor: ["red", "teal", "green"],
        },
        {
            label: "Cards",
            data: matchCards,
            tension: 0.4,
            //backgroundColor: ["red", "teal", "green"],
        },
        {
            label: "Goal Scorers",
            data: matchGoalScorer,
            tension: 0.4,
            //backgroundColor: ["red", "teal", "green"],
        }
        ],
    })

    //Loaded graph data
    useEffect(() => {
        setMatchDetails({

            labels: matchDate,
            color: ["red", "yellow", 'green'],
            datasets: [{
                label: "Score",
                data: matchScore,
                tension: 0.4,
                backgroundColor: 'green',
                borderColor: 'green',
                pointRadius: 10,
                pointHoverRadius: 15,
                fill: true
            },
            {
                label: "Halftime Score",
                data: match_HT_Score,
                tension: 0.4,
                backgroundColor: "teal",
                borderColor: 'teal',
                pointRadius: 10,
                pointHoverRadius: 15
            },
            {
                label: "Other Team Score",
                data: match_OtherScore,
                tension: 0.4,
                backgroundColor: 'red',
                borderColor: 'red',
                pointRadius: 10,
                pointHoverRadius: 15
            },
            {
                label: "Cards",
                data: matchCards,
                tension: 0.4,
                backgroundColor: 'orange',
                borderColor: 'orange',
                pointRadius: 10,
                pointHoverRadius: 15
            },
            {
                label: "Goal Scorers",
                data: matchGoalScorer,
                tension: 0.4,
                pointRadius: 10,
                pointHoverRadius: 15
            }
            ],
        },)
    }, [matchDate, fromDate, toDate])

    //Graph labels
    const [graphLabel, setGraphLabel] = useState({
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },

        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statitistics overtime',
            },
        },
    })


    return (
        <div style={{fontFamily: 'Montserrat'}}>

            <div><h1>Timeline of {updateSelectedTeam}'s Statics</h1></div>

            {/* List of popular leagues */}
            <select onChange={changeLeague}>
                <option>Choose League</option>
                <option>Barclays Premier Leauge</option>
                <option>La Liga</option>
                <option>Bundesliga</option>
            </select>

            {/* List of TEAMS in leagues */}
            <select className='custom-select' ref={teamOptions} onChange={changeTeam}>
                <option >Choose Team</option>
                {teamsList.map(team =>
                    (<option key={team.team_key} value={team.team_key} name={team.teamOptions}>{team.team_name}</option>)
                )}
            </select>

            {/* Year of Mathes */}
            <select ref={yearOptions} onChange={(e) => { setFromDate(e.target.value); setToDate(toDateVal) }}>
                <option >Select Year-</option>
                {selectYearList.map(years => (<option key={years.id}>{years.year}</option>)
                )}
            </select>

            <div style={{ width: 1000 }}>
                <LineGraph chartData={matchDetails} chartOptions={graphLabel} />
            </div>

        </div>
    )
}

export default Timeline