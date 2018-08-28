import React from 'react';

import './Header.css';

const Header = ({result, playerName, playerColor}) => (
  <header className={`Header ${playerColor} ${result === 1 && "white"}`}>
    {result ? (
      playerName && result === 1 ? (
        <h1>O jogador {playerName} ganhou!</h1>
      ):(
        <h1>O jogo empagou!</h1>
      )
    ):(
      <h1>{playerName} é a sua vez!</h1>
    )}
  </header>
);

export default Header;
