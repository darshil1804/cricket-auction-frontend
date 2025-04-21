import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('https://your-backend-url'); // Replace with your backend URL

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  useEffect(() => {
    socket.on('updatePlayers', data => {
      setPlayers(data);
    });

    socket.on('currentPlayer', player => {
      setCurrentPlayer(player);
    });

    return () => {
      socket.off('updatePlayers');
      socket.off('currentPlayer');
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🏏 Cricket Auction Dashboard</h1>
      {currentPlayer ? (
        <div>
          <h2>Up for Auction: {currentPlayer.name}</h2>
          <p>Base Price: ₹{currentPlayer.basePrice}</p>
        </div>
      ) : (
        <p>No player up for auction now.</p>
      )}
      <h3>All Players:</h3>
      <ul>
        {players.map((p, i) => (
          <li key={i}>
            {p.name} - ₹{p.basePrice} - {p.team || 'Unsold'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;