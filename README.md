# rock-paper-scissors

Two-player implementation of rock-paper-scissors game in the browser with capabilities to save gameplay on the backend.


**Initial thought process**

Thinking about possibly 2 ways to design the UX of the game:

**1. Single browser implementation:**

  Both players play from the same client. The gameplay goes as follows:

  - User chooses to start a new game or load the saved game. (multiple ways possible to load saved game, by some gameId generated at gamesave, retreiving from the usernames entered at the next step, or if the user is authenticated, then retrieve all saved games bu authenticated user id)

- If a new game is selected, user enters player 1 name and choses to play against CPU, or enters player 2 name and click some button to start the game. (A unique game id can be generated at this point from the BE and usernames stored in the database)
- Two sections are displayed on the screen, Player 1 and Player 2 (could be CPU) with indiviual scores.
- Player one selects move (rock, paper or scissors), then player 2 choses, or is auto chosen in case of CPU playing. 
- The Winner or a tie is displayed and the scores are updated and saved on the BE. 

in this scenario, the gameplay logic can be run completely on client-side and BE can be used just for score and game-state saving.

**2. Two browsers implementation:** 
  Both players playing from their own devices. The gameplay goes as follows:
  - User choses to start a new game session or join an existing game session.
  - If user starts a new game, the user is asked to enter his/her unique user name (could be taken from user data if we have an authentication layer) and selects if the game is to be a 1 player vs CPU game or a 2 player game. (A new Game session is created on the BE, and the game ID is returned)
  - The user sees the screen to select his next move (Rock/paper/scissors) and the total score of himself and the opponent's score, and the game ID to share to the second player, in case it is a 2 player game. 
  - User plays a move (move is saved in the BE)
  - Now the user sees a "waiting for opponent's turn" until we receive the opponent's response. (for CPU games, this will be instant) (For simplicity, we can say that this can be a polling request, otherwise other some kind of RPC setup can be implemented to avoid polling)
  - In case, the user choses at the second step to join an existing game, he enters the game id received from the creator of the game and his/her userID. (The BE checks if the game has no second player yet, the user is assigned to it otherwise if the userID of the second player doesn't match, an error is thrown)
  - The gameplay information (scores, latest move played or waiting?) is loaded from BE.
  - If the user has not yet played the current move, then the move is played.
  - "waiting for opponent" shown until the other player has played the move (could have been already played) (Poll)
  - When status is received that the move has been completed, message displayed to show win/loss/tie and scores are updated.
  
  
 
**Decision to move ahead**

The single browser approach seems to be too simplistic and not fun. An MVP for the multiple browser version could be acheived in the given timeframe, with some assumptions to make it simpler for the first pass:

- No authentication/authorization layer for the first pass, userID entered is to be trusted.
- Play vs CPU to be skipped for the first pass, develop for a 2 player game and the CPU game could be extended if time remains.
- slight change is ux to add both players while creating a new game and chosing the player while joining an existing game. to avoid extra checks for 3rd person joining the game session.
- Polling is acceptable for now with an interval of 2 seconds for waiting for the other player's move.



**Database model:**

- GameSession (id, player_1_id, player_2_id, player_1_score, player_2_score, current_gameplay)
- Gameplay (id, game_id, player_1_move, player_2_move)


**Rough API Design:**

POST /game: 

  body: `{player1: 'xxxx', player2: 'yyyy'}`

  response: `{id: 1234, player_1_id: 'xxxx', player_2_id: 'yyyy', player_1_score: 100, player_2_score: 123, current_gameplay_id: 12344}`

GET /game?id=1234:

  response `{id: 1234, player_1_id: 'xxxx', player_2_id: 'yyyy', player_1_score: 100, player_2_score: 123, current_gameplay_id: 12344}`

POST /play:

body: `{game_id: 1234, move: 'R/P/S', player_id: 'xxxx'}`
 
GET /gameplay-status-check?game_id=1234&gameplay_id=2233&player_id=xxxx :

  response `{id: 2233, state: 'WIN/LOSE/TIE/IDLE/WAITING'}}`




Steps to run:

To run the backend server:

Activate virtualenv (steps below for mac)

```
cd backend
python3 -m venv env
source env/bin/activate

```

Install dependencies:

```
pip install -r requirements.txt
```

Run migrations

```
python manage.py migrate
```

Run Server

```
python manage.py runserver
```

The server should be running at 127.0.0.1:8000  (assuming to be working with a local sqlite DB)


To run frontend (Make sure to have node installed to latest version preferably):

```
cd frontend

yarn install

yarn start
```

Visit 127.0.0.1:3000 on your browser. and from another tab/incognito.






**Final Summary:**

Around 30 minutes were spent in making the initial design and plan.

After a total of 3 hours, I had the backend ready, tested via http client, and a basic but incomplete frontend  setup. 

Spent about 40 more minutes to finalise the sync and make it working. 


If I had more time, I would have also done the following:

- On the BE side, followed a TDD approach and taken care about implementing authentication and authorisation of the APIs, implemented the "play vs CPU" feature, made all the write actions atomic. 

- On the FE side, have a cleaner UX design, not have any inline styles, have more reusable components, moved the api call logic in custom hooks, written tests.




