import React from 'react';
import './Piece.css';
import { PiecePosition } from './types';

import whiteRook from '../assets/images/pieces/rook-w.svg';
import whiteKnight from '../assets/images/pieces/knight-w.svg';
import whiteBishop from '../assets/images/pieces/bishop-w.svg';
import whiteQueen from '../assets/images/pieces/queen-w.svg';
import whiteKing from '../assets/images/pieces/king-w.svg';
import whitePawn from '../assets/images/pieces/pawn-w.svg';
import blackRook from '../assets/images/pieces/rook-b.svg';
import blackKnight from '../assets/images/pieces/knight-b.svg';
import blackBishop from '../assets/images/pieces/bishop-b.svg';
import blackQueen from '../assets/images/pieces/queen-b.svg';
import blackKing from '../assets/images/pieces/king-b.svg';
import blackPawn from '../assets/images/pieces/pawn-b.svg';

interface PieceProps {
  id: string;
  type: 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn';
  color: 'white' | 'black';
  position: string;
  isSelected: boolean;
  hasMoved: boolean; // Add hasMoved property
  onClick: (piece: PiecePosition) => void;
}

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

const Piece: React.FC<PieceProps> = ({ id, type, color, position, isSelected, hasMoved, onClick }) => {
  const pieceKey = `${color}-${type}`;
  const pieceSrc = pieceImages[pieceKey];

  return (
    <div
      className={`piece ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick({ id, type, color, position, hasMoved })}
    >
      <img src={pieceSrc} alt={`${color} ${type}`} />
    </div>
  );
};

export default Piece;