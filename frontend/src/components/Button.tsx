export default function Button({onClick, children}: { onClick: () => void, children: React.ReactNode}) {
  return (
    <button onClick={onClick} className="bg-green-500 rounded-lg p-4 hover:bg-green-800 text-xl text-white font-bold uppercase">{ children }</button>
  )
}
