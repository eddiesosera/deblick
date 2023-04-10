import NavBar from './components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Compare from './pages/compare';
import Timeline from './pages/timeline';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/compare' element={<Compare/>}/>
        <Route path='/timeline' element={<Timeline/>}/>
      </Routes>
    </div>
  );
}

export default App;
