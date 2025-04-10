import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export default function Game() {
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  const [started, setStarted] = useState(false);

  const [gameStatus, setGameStatus] = useState('');

  useEffect(() => {
    if(!socket) {
      return
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch(message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          console.log('GAME INITIALISED');
          setStarted(true);
          setGameStatus(`Game Started! Your color is ${message.payload.color}`);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log('Move made');
          break;
        case GAME_OVER:
          console.log('GAME OVER!');
          break;
      }
    }

  }, [socket])

  if(!socket) return <div>Connecting....</div>
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 bg-red-200 w-full">
            <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket}/>
          </div>
          <div className="col-span-2 w-full flex items-center justify-center">
            {!started ? <Button onClick={() => {
              socket.send(JSON.stringify({
                type: INIT_GAME
              }))
            }}>Play</Button> : gameStatus}
          </div>
        </div>
      </div>
    </div>
  )
}
