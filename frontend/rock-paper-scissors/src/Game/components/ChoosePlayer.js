import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Paper, Typography, Button } from '@mui/material';

const FormContainer = styled.div`
  display: flex;
  padding: 20%;
  justify-content: space-between;
`;

export const ChoosePlayer = () => {
  const [players, updatePlayers] = useState({});
  let [searchParams] = useSearchParams();
  const gameId = searchParams.get('gameId');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`game/?id=${gameId}`)
      .then((response) => {
        const { player_1_id: player1Name, player_2_id: player2Name } =
          response.data;
        updatePlayers({ player1Name, player2Name });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gameId, searchParams]);

  const onPlayerClick = (playerId) => {
    navigate(`/game?gameId=${gameId}&playerId=${playerId}`);
  };

  return (
    <Container>
      <Paper style={{ marginTop: '30%' }}>
        <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
          {'Rock Paper Scissors!!'}
        </Typography>
        <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
          {'Choose a player to play!!'}
        </Typography>
        <FormContainer container rowSpacing={1} columnSpacing={{ xs: 2 }}>
          <Button
            variant={'outlined'}
            onClick={() => {
              onPlayerClick(players?.player1Name);
            }}
          >
            {players?.player1Name}
          </Button>
          <Button
            variant={'outlined'}
            onClick={() => {
              onPlayerClick(players?.player2Name);
            }}
          >
            {players?.player2Name}
          </Button>
        </FormContainer>
      </Paper>
    </Container>
  );
};
