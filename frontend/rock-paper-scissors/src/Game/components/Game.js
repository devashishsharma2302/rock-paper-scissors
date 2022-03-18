import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Container, Paper, Typography, Button } from '@mui/material';

const GameContainer = styled.div`
  display: flex;
  padding: 20%;
  margin-top: 100px;
  justify-content: space-between;
`;

export const Game = () => {
  let [searchParams] = useSearchParams();
  const [game, setGame] = useState({});
  const [gameplayId, setGamePlayId] = useState({});
  const [currentState, setCurrentState] = useState('IDLE');
  const gameId = searchParams.get('gameId');
  const currentPlayer = searchParams.get('playerId');

  const updateGameScore = useCallback(() => {
    axios
      .get(`game/?id=${gameId}`)
      .then((response) => {
        const {
          player_1_id: player1Name,
          player_2_id: player2Name,
          player_1_score: player1Score,
          player_2_score: player2Score,
          current_gameplay: gameplayId,
        } = response.data;
        setGame({ player1Name, player2Name, player1Score, player2Score });
        setGamePlayId(gameplayId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gameId]);

  useEffect(() => {
    updateGameScore();
  }, [gameId, updateGameScore]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      axios
        .get(
          `gameplay-status-check/?game_id=${gameId}&gameplay_id=${gameplayId}&player_id=${currentPlayer}`
        )
        .then((response) => {
          const { state } = response.data;
          setCurrentState(state);
          if (state === 'WIN' || state === 'LOOSE' || state === 'TIE') {
            setTimeout(updateGameScore, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
    return () => {
      clearInterval(intervalID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameplayId]);

  const onPlay = (move) => {
    axios
      .post('play/', {
        player_id: currentPlayer,
        game_id: gameId,
        move,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const { player1Name, player2Name, player1Score, player2Score } = game;

  return (
    <Container>
      <Paper style={{ marginTop: '10%', padding: '10%' }}>
        <Typography style={{ textAlign: 'center' }}>
          {'Rock Paper Scissors!!'}
        </Typography>
        <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
          {'********* Scoreboard *********'}
        </Typography>
        <Typography style={{ textAlign: 'center' }}>
          {`${player1Name}: ${player1Score} |||| ${player2Name}: ${player2Score}`}
        </Typography>
        <Typography style={{ textAlign: 'center' }}>
          {`Playing as : ${currentPlayer}`}
        </Typography>

        <Typography style={{ textAlign: 'center' }}>
          {`GAME ID : ${gameId}`}
        </Typography>

        {currentState === 'WIN' && (
          <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
            {`Congratulations! you won!`}
          </Typography>
        )}

        {currentState === 'LOOSE' && (
          <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
            {`Hard luck! You lost!`}
          </Typography>
        )}

        {currentState === 'TIE' && (
          <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
            {`It's a Tie!!`}
          </Typography>
        )}

        {currentState === 'WAITING' && (
          <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
            {`Waiting for opponent to play....`}
          </Typography>
        )}

        {currentState === 'IDLE' && (
          <GameContainer>
            <Button
              onClick={() => {
                onPlay('R');
              }}
            >
              {'ROCK'}
            </Button>
            <Button
              onClick={() => {
                onPlay('P');
              }}
            >
              {'PAPER'}
            </Button>
            <Button
              onClick={() => {
                onPlay('S');
              }}
            >
              {'SCISSORS'}
            </Button>
          </GameContainer>
        )}
      </Paper>
    </Container>
  );
};
