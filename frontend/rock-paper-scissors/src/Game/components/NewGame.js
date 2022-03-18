import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Paper, Typography, Button } from '@mui/material';

const FormContainer = styled.div`
  display: flex;
  padding: 10%;
  justify-content: space-between;
`;

export const NewGame = () => {
  const [player1Name, updatePlayer1Name] = useState('');
  const [player2Name, updatePlayer2Name] = useState('');
  const navigate = useNavigate();

  const onNextClick = () => {
    axios
      .post('game/', {
        player_1_id: player1Name,
        player_2_id: player2Name,
      })
      .then(function (response) {
        const gameId = response.data.id;
        navigate(`/choose-player?gameId=${gameId}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <Paper style={{ marginTop: '10%', padding: '10%' }}>
        <Typography style={{ textAlign: 'center' }}>
          {'Rock Paper Scissors!!'}
        </Typography>
        <Typography style={{ marginTop: '100px', textAlign: 'center' }}>
          {'Enter usernames of the players'}
        </Typography>
        <FormContainer>
          <TextField
            value={player1Name}
            label='Player 1'
            onChange={(e) => {
              updatePlayer1Name(e.target.value);
            }}
          />
          <TextField
            label='Player 2'
            value={player2Name}
            onChange={(e) => {
              updatePlayer2Name(e.target.value);
            }}
          />
          <Button onClick={onNextClick}>{'NEXT'}</Button>
        </FormContainer>
      </Paper>
    </Container>
  );
};
