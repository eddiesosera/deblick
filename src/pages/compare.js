import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BarGraph from '../components/charts/compare/bar';
import PieChart from '../components/charts/compare/pie';
import PolarAreaGraph from '../components/charts/compare/polarArea';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

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

  const [playerImg, setPlayerImg] = useState('https://apiv3.apifootball.com/badges/players/58284_sergio-camus.jpg')
  const [playerImg2, setPlayerImg2] = useState('https://apiv3.apifootball.com/badges/players/51921_k-mbappe.jpg')

  //Players
  const [playerList, setPlayerList] = useState(['']);

  //Search
  const [typeInput, setTypeInput] = useState('Sergio Camus');

  const searchInput = (e) => {
    setTypeInput(e.target.value)
  };


  //Get teams => Team 1
  const [teamsList, setTeamsList] = useState([])
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_teams&team_id=73&APIkey=' + apiKey).then((teams) => {
      console.log(teams.data)
      const teamsList = teams.data

      setTeamsList(teamsList.map((player) => player.players.map((name) => name.player_name)))
      setPlayerList(teamsList.map((ply) => ply.players))

      console.log(playerList)

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

  // //Search
  // const [typeInput, setTypeInput] = useState('i');

  // const searchInput = (e) => {
  //   setTypeInput(e.target.value)
  // };

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
      backgroundColor: ["teal", "blue"],
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
    <div style={{// marginLeft: '20%', marginRight: '20%' 
      width: '80vw'
    }}>
      Compare Players

      <br />

      <div style={{display: 'flex'}}>
        <form>
          <input placeholder='Search Player 1' ref={searchRef} onInput={searchInput} />
          <button type='submit' onClick={onSubmit}>Search</button>
          <div>Searching for: '<b> {typeInput} </b>' </div>
        </form>
        <form>
          <input placeholder='Search Player 2' ref={searchRef} onInput={searchInput} />
          <button type='submit' onClick={onSubmit}>Search</button>
          <div>Searching for: '<b> {typeInput} </b>' </div>
        </form>
      </div>

      <div>
        <select>
          <option>Select Country</option>
        </select>
        <select>
          <option>See Leagues</option>
        </select>
        <select>
          <option>See Teams</option>
        </select>
        <select>
          <option>See Players</option>
        </select>
      </div>

      <br />

      <h1>{playerName1} vs. {playerName2}</h1>
      <h3>{playerName2} is a better player</h3>

      <br />

      <div style={{ display: 'flex' }}>

        <Card style={{ width: '12rem', display: 'flex', alignItems: 'center' }}>
          <Card.Img variant='top' style={{ objectFit: 'cover' }} src={playerImg} alt='Player 1' />
          <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card.Title style={{ textAlign: 'center' }}>{playerName1}</Card.Title>
            <Card.Text>
              <img src='' alt='' />
              Atletico Madrid
            </Card.Text>
            <Card.Text>
              10 Goals
            </Card.Text>
            <DropdownButton id="dropdown-basic-button" title={playerName1} ref={teamOptions} onChange={changeTeam}>
              {playerList.map(() => (
                <Dropdown.Item key={'1'}>Name</Dropdown.Item>)
              )}
            </DropdownButton>
          </Card.Body>
        </Card>

        <Card style={{ width: '12rem', display: 'flex', alignItems: 'center' }}>
          <Card.Img variant='top' style={{ objectFit: 'cover' }} src={playerImg2} alt='Player 1' />
          <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card.Title style={{ textAlign: 'center' }}>{playerName2}</Card.Title>
            <Card.Text>
              <img src='' alt='' />
              PSG
            </Card.Text>
            <Card.Text>
              15 Goals
            </Card.Text>
            <DropdownButton id="dropdown-basic-button" title={playerName1} ref={teamOptions} onChange={changeTeam}>
              {playerList.map(() => (
                <Dropdown.Item key={'1'}>
                  Name
                </Dropdown.Item>
              )
              )}
            </DropdownButton>
          </Card.Body>
        </Card>

        <div style={{ width: 500 }}>
          <BarGraph chartData={playerDetails} />
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', width: 300 }}>
        <PieChart chartData={playerDetails} />
        <PolarAreaGraph chartData={playerDetails} />
      </div>

    </div>
  )
}

export default Compare