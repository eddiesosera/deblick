import './App.css';
import {Routes, Route} from 'react-router-dom'
import SideBar from './components/sidebar';
import Home from './pages/home';
import Compare from './pages/compare';
import Timeline from './pages/timeline';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/compare' element={<Compare/>} />
        <Route path='/timeline' element={<Timeline/>} />
      </Routes>
    </div>
  );
}

export default App;
