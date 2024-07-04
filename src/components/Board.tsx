import boardSVG from "../assets/board.svg";

const Board = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <img src={boardSVG} alt="A chess board" />
    </div>
  );
};

export default Board;
