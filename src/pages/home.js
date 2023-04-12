import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import LineGraph from '../components/charts/timeline/line';

import deBlickLogo from '../data/images/logos/deBlick-logo.svg'

function Home() {

  const apiKey = 'aa0feba793eab9ed9931e30af01f28ecba33f0be36e09853905ebbf976d57753';

  // Live Match Details
  const [liveGameTime, setLiveGameTime] = useState('00:00');
  const [liveGameDate, setLiveGameDate] = useState('2023-04-11');
  const [liveGameLeague, setLiveGameLeague] = useState('La Liga');
  const [liveGameHomeTeamName, setLiveGameHomeTeamName] = useState('FC Barcelona');
  const [liveGameHomeTeamLogo, setLiveGameHomeTeamLogo] = useState('https://apiv3.apifootball.com/badges/73_atl.-madrid.jpg');
  const [liveGameAwayTeamName, setLiveGameAwayTeamName] = useState('Real Madrid');
  const [liveGameAwayTeamLogo, setLiveGameAwayTeamLogo] = useState('https://apiv3.apifootball.com\/badges\/97_barcelona.jpg');
  const [liveGameScore, setLiveScore] = useState('0 - 1');

  const [liveGameEvent, setLiveGameEvent] = useState(1);
  const [liveGamePos, setLiveGamePos] = useState(0);

  //Live Match API data
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_events&match_live=' + liveGameEvent + '&APIkey=' + apiKey)
      .then((liveGame) => {
        console.log(liveGame)

        let currentLive = liveGame.data[liveGamePos]

        setLiveGameTime(currentLive.match_time);
        setLiveGameDate(currentLive.match_date);
        setLiveGameLeague(currentLive.league_name);
        setLiveGameHomeTeamName(currentLive.match_hometeam_name);
        setLiveGameHomeTeamLogo(currentLive.team_home_badge);
        setLiveGameAwayTeamName(currentLive.match_awayteam_name);
        setLiveGameAwayTeamLogo(currentLive.team_away_badge);


        setLiveScore(currentLive.match_hometeam_score + " - " + currentLive.match_awayteam_score)

      })
  }, [liveGamePos])

  //Change current game state
  const nextLiveGame = () => {
    setLiveGamePos(liveGamePos + 1)
    console.log(liveGamePos)
  }
  const prevLiveGame = () => {
    setLiveGamePos(liveGamePos - 1)
    console.log(liveGamePos)
  }


  //Top Scorers Details
  const [topScorerImg, setTopScorerImg] = useState('https://apiv3.apifootball.com/badges/players/51921_k-mbappe.jpg');
  const [topScorerName, setTopScorerName] = useState('K. Mbappe');
  const [topScorerGoals, setTopScorerGoals] = useState(9);
  const [topScorerTeam, setTopScorerTeam] = useState('Series A');

  const [topScorerPos, setTopScorerPos] = useState(0);

  const [topPlayerListNames, setTopPlayerListNames] = useState(['', 'Messi', 'Ronaldo', 'Mbappe', 'Rooney']);
  const [topPlayerListGoals, setTopPlayerListGoals] = useState([0, 17, 12, 20, 30]);

  const [leagueID, setLeagueID] = useState(302)
  const [leagueName, setLeagueName] = useState('La Liga')

  //Top Scorer API data
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_topscorers&league_id=' + leagueID + '&APIkey=' + apiKey)
      .then((topScorerData) => {

        let topScorer = topScorerData.data[topScorerPos]
        let topScorerMap = topScorerData.data
        console.log(topScorerMap)

        setTopScorerName(topScorer.player_name)
        setTopScorerGoals(topScorer.goals)
        setTopScorerTeam(topScorer.team_name)

        axios.get('https://apiv3.apifootball.com/?action=get_players&player_id=' + topScorer.player_key + '&APIkey=' + apiKey)
          .then((playerImgData) => {
            console.log(playerImgData)
            let playerImg = playerImgData.data[0]
            setTopScorerImg(playerImg.player_image)

          }, [topScorerPos])

          setTopPlayerListNames(topScorerMap.map((topPL) => topPL.player_name))
          setTopPlayerListGoals(topScorerMap.map((topPL) => topPL.goals))

      })

  }, [topScorerPos, leagueID])

  //Change Top Scorer state
  const nextTopScorer = () => {
    setTopScorerPos(topScorerPos + 1)
    console.log(topScorerPos)
  }
  const prevTopScorer = () => {
    setTopScorerPos(topScorerPos - 1)
    console.log(topScorerPos)
  }

  //Home default page graph
  const [topPlayersGraph, setTopPlayersGraph] = useState({
    labels: topPlayerListNames,
    color: ['blue'],
    datasets: [{
      label: "Goals",
      data: topPlayerListGoals,
      tension: 0.4,
      backgroundColor: 'green',
    }
    ],
  })

  //Home defaul graph
  useEffect(() => {
    setTopPlayersGraph({
      labels: topPlayerListNames,
      color: ['white'],
      datasets: [{
        label: "Goals",
        data: topPlayerListGoals,
        tension: 0.4,
        backgroundColor: 'white',
      }
      ],
    })
  }, [topPlayerListNames, topPlayerListGoals])

  //Change League
  const changeLeague = (e) => {
    setLeagueName(e.target.value)
    const selectedLeague = e.target.value;
    // How to reverse identify an object: const selectedTeamObj = teamsList.filter((team) => team.team_key === selectedTeam.key)

    if (selectedLeague === 'Barclays Premier Leauge') {
      setLeagueID(152)
      setTopScorerPos(0)
    } else
      if (selectedLeague === 'La Liga') {
        setLeagueID(302)
        setTopScorerPos(0)
      } else
        if (selectedLeague === 'Bundesliga') {
          setLeagueID(171)
          setTopScorerPos(0)
        }

    console.log(e.target.key)
  }


  return (
    <div style={{fontFamily: 'Montserrat'}}>

      {/* Introduction */}

      <div className='home-section1-container' style={{display:'flex'}}>
        <img src={deBlickLogo} alt='Home Logo' />
        <div className='hom-section1-description'>
          Welcome to deBlick, a dashboard based on APIFootball.
          The data herein is based soccer statitics.
        </div>
      </div>


      {/* Live match */}

      <div className='home-section2-container' 
      style={{display:'flex',background: 'rgb(31,36,38)', background:'linear-gradient(90deg, rgba(31,36,38,1) 0%, rgba(20,24,25,1) 100%)', 
      height:'330px', borderRadius:'20px',boxShadow: '0px 2px 15px rgba(10, 163, 239, 0.2)', 
      border:'1px solid linear-gradient(90deg, rgba(25,177,252,1) 0%, rgba(255,215,3,1) 100%)',
      flexDirection:'column', justifyContent:'space-around', padding:'40px', margin:'40px auto' }}>

        <div className='home-section2-Top' style={{display:'flex', justifyContent:'space-between'}}>
          <div className='home-section2-Top-Left'style={{textAlign:'start'}}>
            <div className='section2-top-H' style={{fontSize:'24px', fontWeight:'600'}}>Live Match</div>
            <div style={{color:'#8A9499'}}> Game 1 </div>
          </div>
          <div className='home-section2-Top-Middle' style={{textAlign:'center'}}>
            <div className='section2-top-H' style={{fontSize:'24px', fontWeight:'600'}}>{liveGameTime}</div>
            <div  style={{color:'#8A9499'}}>{liveGameDate}</div>
          </div>
          <div className='home-section2-Top-Right' style={{textAlign:'end'}}>
            <div className='section2-top-H'style={{fontSize:'24px', fontWeight:'600'}}>League</div>
            <div style={{color:'#8A9499'}}>{liveGameLeague}</div>
          </div>
        </div>
        <div className='home-section2-Middle' style={{display:'flex', flexDirection:'collumn', height:'120px', 
        alignItems:'center', justifyContent:'space-between'}}>
          <div className='section2-middle-left-homeTeam' style={{fontSize:'24px', fontWeight:'600'}}>
            <img src={liveGameHomeTeamLogo} alt='Home' />
            {liveGameHomeTeamName}
          </div>
          <div className='section2-middle-middle-score' style={{fontSize:'96px', fontWeight:'700'}}>
            {liveGameScore}
          </div>
          <div className='section2-middle-left-awayTeam' style={{fontSize:'24px', fontWeight:'600'}}>
            {liveGameAwayTeamName}
            <img src={liveGameAwayTeamLogo} alt='Away' />
          </div>
        </div>
        <div className='home-section2-BtmNav' style={{display:'flex', justifyContent:'center', cursor:'pointer'}}>
          <FontAwesomeIcon icon={faChevronLeft} onClick={prevLiveGame} className="s2-btm-icon" style={{marginRight:'10px', opacity:'0.3'}}/>
          <FontAwesomeIcon icon={faChevronRight} onClick={nextLiveGame} className="s2-btm-icon" style={{marginLeft:'10px'}}/>
        </div>
      </div>


      {/* Top Scorer section */}

      <div className='home-section3-container' style={{display:'flex' }}>
        <div className='topScorer-card-container-left' style={{background:'#1E2326', borderRadius:'10px', padding:'10px', 
        height:'400px', display:'flex', flexDirection:'column', justifyContent:'space-around', marginRight:'20px'}}>
          <div className='card-topHead' style={{textAlign:'center'}}>
            Top Scorer #{topScorerPos +1}
          </div>
          <div className='card-ImageSec' style={{cursor:'pointer'}}>
            <FontAwesomeIcon icon={faChevronLeft} onClick={prevTopScorer} className="s2-btm-icon" />
            <img src={topScorerImg} alt='top Scorer' style={{margin:'auto 10px'}} />
            <FontAwesomeIcon icon={faChevronRight} onClick={nextTopScorer} className="s2-btm-icon" />
          </div>
          <div className='card-top-playerName' style={{fontSize:'24px', fontWeight:'600', textAlign:'center'}}>
            {topScorerName}
          </div>
          <div className='card-extraInfo' style={{display:'flex', justifyContent:'space-between'}}>
            <div className='extraInfo-goals'>
              <div className='extraInfo-goals-head'  style={{color:'#8A9499'}}>
                GOALS
              </div>
              <div className='extraInfo-goals-goals' style={{fontSize:'16px', fontWeight:'600'}}>
                {topScorerGoals}
              </div>
            </div>
            <div className='extraInfo-Team' style={{textAlign:'end'}}>
              <div className='extraInfo-Team-head'  style={{color:'#8A9499'}}>
                TEAM
              </div>
              <div className='extraInfo-Team' style={{fontSize:'16px', fontWeight:'600'}}>
                {topScorerTeam}
              </div>
            </div>
          </div>
        </div>


        {/* Top Scorer GRAPH */}
<br/>
        <div>
          <div>
            Top Scorers
            <select onChange={changeLeague}>
              <option>Choose League</option>
              <option>Barclays Premier Leauge</option>
              <option>La Liga</option>
              <option>Bundesliga</option>
            </select>
          </div>
          <div style={{width:'900px !important', height:'500 !important'}}>
            <LineGraph chartData={topPlayersGraph} />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home