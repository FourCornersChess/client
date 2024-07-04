import React from 'react';
import './Piece.css';

// Import the SVG images
import whiteRook from '../assets/rook-w.svg';
import whiteKnight from '../assets/knight-w.svg';
import whiteBishop from '../assets/bishop-w.svg';
import whiteQueen from '../assets/queen-w.svg';
import whiteKing from '../assets/king-w.svg';
import whitePawn from '../assets/pawn-w.svg';
import blackRook from '../assets/rook-b.svg';
import blackKnight from '../assets/knight-b.svg';
import blackBishop from '../assets/bishop-b.svg';
import blackQueen from '../assets/queen-b.svg';
import blackKing from '../assets/king-b.svg';
import blackPawn from '../assets/pawn-b.svg';

// Define the type for the PieceProps
interface PieceProps {
  type: 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn';
  color: 'white' | 'black';
  position: string;
}

// Define the type for the pieceImages object
const pieceImages: Record<string, string> = {
  'white-rook': whiteRook,
  'white-knight': whiteKnight,
  'white-bishop': whiteBishop,
  'white-queen': whiteQueen,
  'white-king': whiteKing,
  'white-pawn': whitePawn,
  'black-rook': blackRook,
  'black-knight': blackKnight,
  'black-bishop': blackBishop,
  'black-queen': blackQueen,
  'black-king': blackKing,
  'black-pawn': blackPawn,
};

const Piece: React.FC<PieceProps> = ({ type, color, position }) => {
  const pieceKey = `${color}-${type}`;
  const pieceSrc = pieceImages[pieceKey];

  return (
    <div className={`piece ${position} ${color === 'black' ? 'black-piece' : ''}`}>
      <img src={pieceSrc} alt={`${color} ${type}`} />
    </div>
  );
};

export default Piece;