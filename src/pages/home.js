import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import LineGraph from '../components/charts/timeline/line';

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
  const [liveGameEvent, setLiveGameEvent] = useState(1)

  // Top Scorer details
  const [topScorerImg, setTopScorerImg] = useState('https://apiv3.apifootball.com/badges/players/51921_k-mbappe.jpg');
  const [topScorerName, setTopScorerName] = useState('K. Mbappe');
  const [topScorerGoals, setTopScorerGoals] = useState(9);
  const [topScorerLeague, setTopScorerLeague] = useState('Series A');

  //Live Match API data
  useEffect(() => {
    axios.get('https://apiv3.apifootball.com/?action=get_events&match_live=' + liveGameEvent + '&APIkey=' + apiKey)
      .then((liveGame) => {
        console.log(liveGame)
      })
  })

  return (
    <div>

      {/* Introduction */}

      <div className='home-section1-container'>
        <img src='' alt='Home Logo' />
        <div className='hom-section1-description'>
          Welcome to deBlick, a dashboard based on APIFootball.
          The data herein is based soccer statitics.
        </div>
      </div>

      {/* Live match */}
      <div className='home-section2-container'>
        <div className='home-section2-Top'>
          <div className='home-section2-Top-Left'>
            <div className='section2-top-H'>Live Match</div>
            <div> Game 1 </div>
          </div>
          <div className='home-section2-Top-Middle'>
            <div className='section2-top-H'>{liveGameTime}</div>
            <div>{liveGameDate}</div>
          </div>
          <div className='home-section2-Top-Right'>
            <div className='section2-top-H'>League</div>
            <div>{liveGameLeague}</div>
          </div>
        </div>
        <div className='home-section2-Middle'>
          <div className='section2-middle-left-homeTeam'>
            <img src={liveGameHomeTeamLogo} alt='home team logo' />
            {liveGameHomeTeamName}
          </div>
          <div className='section2-middle-middle-score'>
            {liveGameScore}
          </div>
          <div className='section2-middle-left-awayTeam'>
            {liveGameAwayTeamName}
            <img src={liveGameAwayTeamLogo} alt='Away team logo' />
          </div>
        </div>
        <div className='home-section2-BtmNav'>
          <FontAwesomeIcon icon={faChevronLeft} className="s2-btm-icon" />
          <FontAwesomeIcon icon={faChevronRight} className="s2-btm-icon" />
        </div>
      </div>

      {/* Top Scorer section */}

      <div className='home-section3-container'>
        <div className='topScorer-card-container-left'>
          <div className='card-topHead'>
            Top Scorer
          </div>
          <img src={topScorerImg} alt='top Scorer' />
          <div className='card-top-playerName'>
            {topScorerName}
          </div>
          <div className='card-extraInfo'>
            <div className='extraInfo-goals'>
              <div className='extraInfo-goals-head'>
                GOALS
              </div>
              <div className='extraInfo-goals-goals'>
                {topScorerGoals}
              </div>
            </div>
            <div className='extraInfo-League'>
              <div className='extraInfo-league-head'>
                LEAGUE
              </div>
              <div className='extraInfo-league-league'>
                {topScorerLeague}
              </div>
            </div>
          </div>
        </div>
        {/* <LineGraph chartData={}/> */}
      </div>

    </div>
  )
}

export default Home