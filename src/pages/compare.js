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

  //Player data points
  const [playerName1, setPlayerName1] = useState('Sergio Camus')
  const [playerAge1, setPlayerAge1] = useState([35])
  const [playerGoals1, setPlayerGoals1] = useState([15])
  const [playerMinutes1, setPlayerMinutes1] = useState([5])
  const [playerMatchPlayed1, setPlayerMatchPlayed1] = useState([15]);
  const [playerTeam1, setPlayerTeam1] = useState('Atletico Madrid')

  const [playerName2, setPlayerName2] = useState('Mbappe')
  const [playerAge2, setPlayerAge2] = useState([19])
  const [playerGoals2, setPlayerGoals2] = useState([24])
  const [playerMinutes2, setPlayerMinutes2] = useState([9])
  const [playerMatchPlayed2, setPlayerMatchPlayed2] = useState([19])
  const [playerTeam2, setPlayerTeam2] = useState('Atletico Madrid')


  const [playerImg, setPlayerImg] = useState('https://apiv3.apifootball.com/badges/players/58284_sergio-camus.jpg')
  const [playerImg2, setPlayerImg2] = useState('https://apiv3.apifootball.com/badges/players/51921_k-mbappe.jpg')


  //Search
  const [typeInput, setTypeInput] = useState('');
  const [typeInput2, setTypeInput2] = useState('');

  //Get Search value
  const searchInput = (e) => {
    setTypeInput(e.target.value)
  };
  const searchInput2 = (e) => {
    setTypeInput2(e.target.value)
  };

  //Search Submit
  const searchRef = useRef()
  const searchRef2 = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    alert(' searching for: "' + typeInput + '"')
    searchRef.current = ' '
    setTypeInput(e.target.value)
  }
  const onSubmit2 = (e) => {
    e.preventDefault()
    alert(' searching for: "' + typeInput2 + '"')
    searchRef2.current = ' ';
    setTypeInput2(e.target.value)
  }

  //Update Searched Player 1
  const [player1Pos, setPlayer1Pos] = useState(0);
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_players&player_name=' + typeInput + '&APIkey=' + apiKey)
      .then((player1Data) => {

        let player1 = player1Data.data[player1Pos]

        setPlayerName1(player1.player_name)
        setPlayerAge1(player1.player_age)
        setPlayerGoals1(player1.player_goals)
        setPlayerMinutes1(player1.player_minutes)
        setPlayerMatchPlayed1(player1.player_match_played)
        setPlayerTeam1(player1.team_name)
        setPlayerImg(player1.player_image)

      })
  }, [typeInput, player1Pos])

    //Update Searched Player 2
    const [player2Pos, setPlayer2Pos] = useState(0);
    useEffect(() => {
      axios.get('https://apiv3.apifootball.com/?action=get_players&player_name=' + typeInput2 + '&APIkey=' + apiKey)
        .then((player2Data) => {
  
          let player2 = player2Data.data[player2Pos]
  
          setPlayerName2(player2.player_name)
          setPlayerAge2(player2.player_age)
          setPlayerGoals2(player2.player_goals)
          setPlayerMinutes2(player2.player_minutes)
          setPlayerMatchPlayed2(player2.player_match_played)
          setPlayerTeam2(player2.team_name)
          setPlayerImg2(player2.player_image)
  
        })
    }, [typeInput2, player2Pos])

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
      label: ("Minutes"),
      data: [playerMinutes1, playerMinutes2],
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
  }, [playerName1, playerName2])

  //Reload graph
  useEffect(() => {
    setPlayerDetails({
      labels: [playerName1, playerName2],
      color: ["red", "yellow", 'green'],
      datasets: [{
        label: ("Age"),
        data: [playerAge1, playerAge2],
        tension: 0.4,
        backgroundColor: ['green', "cream"],
      },
      {
        label: ("Minutes"),
        data: [playerMinutes1, playerMinutes2],
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
    },)
  }, [playerName1, playerName1])

  return (
    <div style={{ width: '80vw' }}>
      <h1>Compare Players</h1>

      <div style={{ display: 'flex' }}>

        <form>
          <input placeholder='Search Player 1' ref={searchRef} onInput={searchInput} />
          <button type='submit' onClick={onSubmit}>Search</button>
          <div>Player 1: '<b> {typeInput} </b>' </div>
        </form>

        <form>
          <input placeholder='Search Player 2' ref={searchRef2} onInput={searchInput2} />
          <button type='submit' onClick={onSubmit2}>Search</button>
          <div>Player 2: '<b> {typeInput2} </b>' </div>
        </form>

      </div>

      <br />

      <h4>{playerName2} is a better player</h4>

      <br />

      <div style={{ display: 'flex' }}>

        <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', background:'#1E2326' }}>
          <Card.Img variant='top' style={{ objectFit: 'cover' }} src={playerImg} alt='Player 1' />
          <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card.Title style={{ textAlign: 'center' }}>{playerName1}</Card.Title>
            <Card.Text>
              {playerTeam1}
            </Card.Text>
            <Card.Text>
              {playerGoals1}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', background:'#1E2326' }}>
          <Card.Img variant='top' style={{ objectFit: 'cover' }} src={playerImg2} alt='Player 1' />
          <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card.Title style={{ textAlign: 'center' }}>{playerName2}</Card.Title>
            <Card.Text>
              {playerTeam2}
            </Card.Text>
            <Card.Text>
            {playerGoals1}
            </Card.Text>
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