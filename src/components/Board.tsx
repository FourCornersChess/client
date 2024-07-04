import React from 'react';
import boardSVG from '../assets/board2.svg';
import Piece from './Piece';
import './Board.css'; // Import the CSS file for the board

// Define the type for the initial positions
interface PiecePosition {
  type: 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn';
  color: 'white' | 'black';
  position: string;
}

const initialPositions: PiecePosition[] = [
  { type: 'rook', color: 'white', position: 'a1' },
  { type: 'knight', color: 'white', position: 'b1' },
  { type: 'bishop', color: 'white', position: 'c1' },
  { type: 'queen', color: 'white', position: 'd1' },
  { type: 'king', color: 'white', position: 'e1' },
  { type: 'bishop', color: 'white', position: 'f1' },
  { type: 'knight', color: 'white', position: 'g1' },
  { type: 'rook', color: 'white', position: 'h1' },
  { type: 'pawn', color: 'white', position: 'a2' },
  { type: 'pawn', color: 'white', position: 'b2' },
  { type: 'pawn', color: 'white', position: 'c2' },
  { type: 'pawn', color: 'white', position: 'd2' },
  { type: 'pawn', color: 'white', position: 'e2' },
  { type: 'pawn', color: 'white', position: 'f2' },
  { type: 'pawn', color: 'white', position: 'g2' },
  { type: 'pawn', color: 'white', position: 'h2' },
  { type: 'rook', color: 'black', position: 'a8' },
  { type: 'knight', color: 'black', position: 'b8' },
  { type: 'bishop', color: 'black', position: 'c8' },
  { type: 'queen', color: 'black', position: 'd8' },
  { type: 'king', color: 'black', position: 'e8' },
  { type: 'bishop', color: 'black', position: 'f8' },
  { type: 'knight', color: 'black', position: 'g8' },
  { type: 'rook', color: 'black', position: 'h8' },
  { type: 'pawn', color: 'black', position: 'a7' },
  { type: 'pawn', color: 'black', position: 'b7' },
  { type: 'pawn', color: 'black', position: 'c7' },
  { type: 'pawn', color: 'black', position: 'd7' },
  { type: 'pawn', color: 'black', position: 'e7' },
  { type: 'pawn', color: 'black', position: 'f7' },
  { type: 'pawn', color: 'black', position: 'g7' },
  { type: 'pawn', color: 'black', position: 'h7' },
];

const Board: React.FC = () => {
  return (
    <div className="chess-board-container">
      <div className="board">
        <img src={boardSVG} alt="A chess board" className="chess-board" />
        <div className="grid">
          {initialPositions.map((piece, index) => (
            <Piece key={index} type={piece.type} color={piece.color} position={piece.position} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;