import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BarGraph from '../components/charts/compare/bar';
import PieChart from '../components/charts/compare/pie';
import PolarAreaGraph from '../components/charts/compare/polarArea';

function Compare() {

  const apiKey = 'aa0feba793eab9ed9931e30af01f28ecba33f0be36e09853905ebbf976d57753';

  //Teams
  const [selectTeam1, setSelectTeam1] = useState('Team 1')
  const [selectTeam2, setSelectTeam2] = useState('Team 2')

  //Player data points
  const [playerName1, setPlayerName1] = useState('Messi')
  const [playerAge1, setPlayerAge1] = useState([35])
  const [playerGoals1, setPlayerGoals1] = useState([15])
  const [playerClearences1, setPlayerClearences1] = useState([5])
  const [playerMatchPlayed1, setPlayerMatchPlayed1] = useState([15]);

  const [playerName2, setPlayerName2] = useState('Ronaldo')
  const [playerAge2, setPlayerAge2] = useState([19])
  const [playerGoals2, setPlayerGoals2] = useState([24])
  const [playerClearences2, setPlayerClearences2] = useState([9])
  const [playerMatchPlayed2, setPlayerMatchPlayed2] = useState([19])

  //Players
  const [playerList, setPlayerList] = useState([]);

  //Get teams => Team 1
  const [teamsList, setTeamsList] = useState([])
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_teams&team_id=73&APIkey=' + apiKey).then((teams) => {
      console.log(teams.data)
      const teamsList = teams.data

      setTeamsList(teamsList.map((player) => player.players.map((name) => name.player_name)))
      setPlayerList(teamsList.map((ply) => ply.players))

      //setPlayerAge(teamsList.map((age) => age.players.player_age))
      console.log(teamsList.map((ply) => ply.players))

    })
  }, [])

  //Get teams => Team 2
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_teams&team_id=79&APIkey=' + apiKey).then((teams) => {
      console.log(teams.data)
      const teamsList = teams.data

      //setPlayerAge(teamsList.map((age) => age.players.player_age))
      //console.log(teamsList.map((age) => age.players.map((player) => player.player_age)))

    })
  }, [])

  //Team List
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=' + apiKey).then((teams) => {
      console.log(teams.data)
    })
  }, [])

  //Change Team on list
  const teamOptions = useRef()
  const changeTeam = (e) => {
    setSelectTeam1(e.target.value)
  }
  const changeTeam2 = (e) => {
    setSelectTeam2(e.target.value)
  }

  //Search
  const [typeInput, setTypeInput] = useState('i');

  const searchInput = (e) => {
    setTypeInput(e.target.value)
  };

  const searchRef = useRef()
  const onSubmit = (e) => {
    e.preventDefault()
    alert(' searching for: "' + typeInput + '"')
    searchRef.current = ' '
  }

  // Load graph
  //Default graph data
  const [playerDetails, setPlayerDetails] = useState({
    labels: [playerName1, playerName2],
    color: ["red", "yellow", 'green'],
    datasets: [{
      label: ("Age"),
      data: [playerAge1, playerAge2],
      tension: 0.4,
      backgroundColor: ['green', "cream"],
    },
    {
      label: ("Clearence"),
      data: [playerClearences1, playerClearences2],
      tension: 0.4,
      backgroundColor: ["red", "pink"],
    },
    {
      label: ("Goals"),
      data: [playerGoals1, playerGoals2],
      tension: 0.4,
      backgroundColor:  ["teal", "blue"],
    },
    {
      label: ("Match played"),
      data: [playerMatchPlayed1, playerMatchPlayed2],
      tension: 0.4,
      backgroundColor: ["orange", "gold"],
    }
    ],
  })



  return (
    <div>
      Compare Player Statics<br />
      <form>
        <input placeholder='Search player' ref={searchRef} onInput={searchInput} />
        <button type='submit' onClick={onSubmit}>Search</button>
      </form>

      <div>Searching for: '<b> {typeInput} </b>' </div>

      <h1>{selectTeam1} vs {selectTeam2}</h1>

      <select className='custom-select' ref={teamOptions} onChange={changeTeam}>
        <option >Choose Team 1</option>
        {playerList.map(team => (
          <option key={'1'}>
            {team.map((p) => p.player_name)}
          </option>
        )
        )}
      </select>

      <BarGraph chartData={playerDetails} />
      <PieChart chartData={playerDetails}/>
    <PolarAreaGraph chartData={playerDetails} />

    </div>
  )
}

export default Compare