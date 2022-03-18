import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Container, Paper, Typography, Link, TextField } from '@mui/material';

const ButtonsContainer = styled.div`
  display: flex;
  padding: 20%;
  justify-content: space-between;
`;

const GameIdFormContainer = styled.div``;

export const Home = () => {
  const [gameId, setGameId] = useState('');
  return (
    <Container>
      <Paper style={{ marginTop: '10%', padding: '10%' }}>
        <Typography style={{ textAlign: 'center' }}>
          {'Rock Paper Scissors!!'}
        </Typography>
        <Typography style={{ textAlign: 'center' }}>
          {'Start a new game, or join using existing Game ID'}
        </Typography>
        <ButtonsContainer container rowSpacing={1} columnSpacing={{ xs: 2 }}>
          <Button variant='outlined'>
            <Link href='new-game'>{'New Game'}</Link>
          </Button>
          <GameIdFormContainer>
            <TextField
              label='Game ID'
              value={gameId}
              onChange={(e) => {
                setGameId(e.target.value);
              }}
            />
            <Button variant='outlined' disabled={!gameId}>
              <Link href={`/choose-player?gameId=${gameId}`}>
                {'Load Game'}
              </Link>
            </Button>
          </GameIdFormContainer>
        </ButtonsContainer>
      </Paper>
    </Container>
  );
};
