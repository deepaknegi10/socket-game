# Scoober Frontend Side

## Pictures from the game
![Pic1](<images/Screenshot 2024-03-12 at 00.13.11.png>)
![Pic2](<images/Screenshot 2024-03-12 at 00.13.27.png>)
![Pic3](<images/Screenshot 2024-03-12 at 00.13.51.png>)
![Pic4](<images/Screenshot 2024-03-12 at 00.14.02.png>)

## How to run the frontend
```
npm i
npm run start
```

### Few Assumptions

#### At the server
We were asked to use server optionally, so I have made a few small changes:
- I have made a small change by sending back the number we send from FE, as PreviousNumber.
- I have changed the limit from 1999-9999 to 19-99, to lower the number of turns.

#### At the client
- I have not used implemented the state using redux due to lack of personal time. I really wanted to do was to have a state => Socket, users and rooms and use it whenever needed.
