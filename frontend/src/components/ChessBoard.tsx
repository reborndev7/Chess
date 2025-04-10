import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../screens/Game";

export default function ChessBoard({ chess, setBoard, board, socket }: {
  chess: any,
  setBoard: any,
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) {
  const [from, setFrom] = useState<Square | null>(null);
  return (
    <div className="board border">
      {board.map((row, i) => {
        return <div key={i} className="flex">
          {row.map((square, j) => {
            const squareId = String.fromCharCode(97 + (j%8)) + "" + (8 - i) as Square
            return <div onClick={() => {
              if(!from) {
                setFrom(squareId ?? null);
              } else {
                try {
                  socket.send(JSON.stringify({
                    type: MOVE,
                    payload: {
                      move: {
                        from,
                        to: squareId
                      }
                    }
                  }))
                  chess.move({
                    from,
                    to: squareId
                  });
                } catch(e :any) {
                  console.error(e.message)
                  setFrom(null);
                }
                setFrom(null);
                setBoard(chess.board());
              }
            }} key={j} className={`w-20 h-20 ${(i + j)%2 === 0 ? 'bg-slate-900': 'bg-yellow-100'}`}>
              <div className="h-full w-full flex justify-center items-center">
                {square ?  <img className="piece w-14" src={`/assets/pieces/${square?.color === 'b' ? square?.type : square?.type?.toUpperCase()}.png`} />: null}
              </div>
            </div>
          })}
        </div>
      })}
    </div>
  )
}
