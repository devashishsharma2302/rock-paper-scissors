import './App.css';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Game/components/Home';
import { NewGame } from './Game/components/NewGame';
import { ChoosePlayer } from './Game/components/ChoosePlayer';
import { Game } from './Game/components/Game';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/new-game' element={<NewGame />} />
      <Route path='/choose-player' element={<ChoosePlayer />} />
      <Route path='/game' element={<Game />} />
    </Routes>
  );
}

export default App;
