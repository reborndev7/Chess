import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <main className="landing-page">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="board-image">
            <img src="/assets/board.png" alt="" />
          </div>
          <div className="board-title mx-auto max-w-md text-center">
            <h2 className="text-5xl font-bold mb-5">Play Chess Online on the #1 Site!</h2>
            <Button onClick={() => { navigate('/game')}}>Join Room</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
